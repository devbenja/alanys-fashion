"use client";

import React, { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categoriesApi, productsApi, Category, Product } from '@/lib/api';

const DEFAULT_SIZES = ['S', 'M', 'L', 'XL'];

interface ColorVariant {
  name: string;
  hexCode: string;
}

const DEFAULT_COLORS: ColorVariant[] = [
  { name: 'Rosa Suave', hexCode: '#F4C2D7' },
  { name: 'Azul Océano', hexCode: '#4285F4' },
  { name: 'Verde Oliva', hexCode: '#34A853' },
];

export default function EditarProductoAdmin({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Unwrap params using React.use() for Next.js 15
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  // Base Data loaded from DB
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Cloudinary settings from environment variables
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dhzlhfgtq';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'alanys_preset';

  // Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('Alanys Fashion');
  const [gender, setGender] = useState('Femenino');
  const [status, setStatus] = useState('active'); // active / draft

  // Variant States
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<ColorVariant[]>([]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#F4C2D7');
  const [showColorAdd, setShowColorAdd] = useState(false);

  // Images state
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Submission States
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadProductAndCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const [categoriesRes, productRes] = await Promise.all([
          categoriesApi.getAll(),
          productsApi.getById(id),
        ]);

        if (categoriesRes.success && categoriesRes.data) {
          setCategories(categoriesRes.data);
        }

        if (productRes.success && productRes.data) {
          const prod = productRes.data;
          setProduct(prod);
          
          // Prepopulate states
          setName(prod.name);
          setDescription(prod.description);
          setCategoryId(prod.categoryId);
          setPrice(typeof prod.price === 'number' ? prod.price.toString() : prod.price);
          setStock(prod.stock.toString());
          setSku(prod.sku || '');
          setBrand(prod.brand || '');
          setGender(prod.gender || 'Femenino');
          setStatus(prod.status || 'active');
          
          setUploadedImages(prod.images ? prod.images.map(img => img.imageUrl) : []);
          setSelectedSizes(prod.sizes ? prod.sizes.map(s => s.size) : []);
          setColors(prod.colors ? prod.colors.map(c => ({ name: c.colorName, hexCode: c.hexCode || '#CCCCCC' })) : []);
        } else {
          setError(productRes.message || 'Error al obtener los detalles del producto.');
        }
      } catch (err) {
        console.error('Failed to load product for editing:', err);
        setError('Error al conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };

    loadProductAndCategories();
  }, [id]);

  // Cloudinary Direct Unsigned Upload
  const handleUploadImages = async (files: FileList) => {
    if (!cloudName.trim() || !uploadPreset.trim()) {
      alert('Configuración de Cloudinary incompleta.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    const totalFiles = files.length;
    let completed = 0;

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset.trim());

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error al subir a Cloudinary.');
        }

        const data = await response.json();
        if (data.secure_url) {
          setUploadedImages((prev) => [...prev, data.secure_url]);
        }
      } catch (err: any) {
        console.error('Cloudinary upload failure:', err);
        setError('Error al cargar alguna de las imágenes.');
      } finally {
        completed++;
        setUploadProgress(Math.round((completed / totalFiles) * 100));
      }
    }

    setUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUploadImages(e.target.files);
    }
  };

  const removeUploadedImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Toggle Sizes Checkboxes
  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes((prev) => prev.filter((s) => s !== size));
    } else {
      setSelectedSizes((prev) => [...prev, size]);
    }
  };

  // Colors Management
  const handleAddColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColorName.trim()) return;

    setColors((prev) => [...prev, { name: newColorName.trim(), hexCode: newColorHex }]);
    setNewColorName('');
    setShowColorAdd(false);
  };

  const removeColor = (colorName: string) => {
    setColors((prev) => prev.filter((c) => c.name !== colorName));
  };

  // Handle Edit Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !categoryId || !description.trim() || !price) {
      setError('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    setSubmitting(true);

    try {
      const parsedPrice = parseFloat(price);
      const parsedStock = parseInt(stock) || 0;

      // 1. Update Base Product details in DB
      const updateResponse = await productsApi.update(id, {
        categoryId,
        name: name.trim(),
        description: description.trim(),
        price: parsedPrice,
        stock: parsedStock,
        sku: sku.trim() || undefined,
        brand: brand.trim() || undefined,
        gender: gender || undefined,
        status: status,
      });

      if (!updateResponse.success) {
        throw new Error(updateResponse.message || 'Error al actualizar el producto base.');
      }

      // 2. Self-cleaning variant updates
      // Delete old variant records in database first
      if (product) {
        if (product.images && product.images.length > 0) {
          for (const img of product.images) {
            await productsApi.deleteImage(id, img.id);
          }
        }
        if (product.sizes && product.sizes.length > 0) {
          for (const s of product.sizes) {
            await productsApi.deleteSize(id, s.id);
          }
        }
        if (product.colors && product.colors.length > 0) {
          for (const c of product.colors) {
            await productsApi.deleteColor(id, c.id);
          }
        }
      }

      // 3. Save new variant sets to database
      if (uploadedImages.length > 0) {
        for (let i = 0; i < uploadedImages.length; i++) {
          await productsApi.addImage(id, {
            imageUrl: uploadedImages[i],
            isMain: i === 0,
          });
        }
      }

      if (selectedSizes.length > 0) {
        for (const size of selectedSizes) {
          const stockPerSize = Math.max(1, Math.floor(parsedStock / selectedSizes.length));
          await productsApi.addSize(id, {
            size,
            stock: stockPerSize,
          });
        }
      }

      if (colors.length > 0) {
        for (const color of colors) {
          await productsApi.addColor(id, {
            colorName: color.name,
            hexCode: color.hexCode,
          });
        }
      }

      setSuccess('¡Producto y variantes actualizados exitosamente!');

      setTimeout(() => {
        router.push('/admin/producto');
      }, 2000);

    } catch (err: any) {
      console.error('Failed to update product variants:', err);
      setError(err.message || 'Error al guardar modificaciones del producto.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center text-on-surface-variant gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="font-bold">Cargando detalles para edición...</p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="py-40 text-center space-y-4 max-w-md mx-auto">
        <span className="material-symbols-outlined text-6xl text-error">warning</span>
        <h2 className="text-3xl font-black text-primary">Error de Carga</h2>
        <p className="text-on-surface-variant">{error}</p>
        <Link href="/admin/producto" className="inline-block px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-sm">
          Volver al Inventario
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 relative pb-20">
      {/* Page Header */}
      <div className="flex flex-col gap-3">
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant font-medium font-dm-sans">
          <Link className="hover:text-primary transition-colors" href="/admin/producto">Inventario</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-secondary font-bold">Editar Producto</span>
        </nav>
        <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-3">Modificar Producto</h2>
        <p className="text-lg text-on-surface-variant font-medium">Modifica los detalles, precios, variantes o imágenes subidas en Cloudinary.</p>
      </div>

      {success && (
        <div className="p-4 bg-primary-container text-on-primary-container rounded-xl flex items-center gap-3 border border-primary/20 animate-pulse font-bold">
          <span className="material-symbols-outlined">check_circle</span>
          {success}
        </div>
      )}

      {error && (
        <div className="p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-3 border border-error/20 font-bold animate-shake">
          <span className="material-symbols-outlined">warning</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-1 lg:col-span-8 space-y-8">
          {/* Details Card */}
          <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm">
            <h2 className="font-h2 text-xl mb-6 text-secondary font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">edit_document</span>
              Detalles del Producto
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-caps block font-bold uppercase tracking-wider text-sm text-on-surface-variant">
                  Título del Producto *
                </label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-xl px-5 py-3 transition-all text-on-surface font-medium" 
                  placeholder="ej. Blusa de Seda Premium" 
                  required
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps block font-bold uppercase tracking-wider text-sm text-on-surface-variant">
                  Descripción *
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-xl px-5 py-3 transition-all text-on-surface font-medium" 
                  placeholder="Describe la tela, el ajuste y las sensaciones de esta prenda..." 
                  rows={6}
                  required
                  disabled={submitting}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Cloudinary Images Upload */}
          <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm">
            <h2 className="font-h2 text-xl mb-6 text-secondary font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">cloud_upload</span>
              Imágenes del Producto (Cloudinary)
            </h2>

            <input 
              type="file" 
              multiple 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              className="hidden" 
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-outline-variant rounded-xl p-12 text-center bg-surface-container group hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                </div>
                <h3 className="font-h2 text-lg text-on-surface font-bold">Haz clic para añadir nuevas imágenes</h3>
                <p className="text-on-surface-variant mt-2 text-sm">Sube nuevas fotos directamente a tu Cloudinary</p>
                <button className="mt-6 px-6 py-2 border-2 border-[#F4C2D7] text-on-primary-container bg-surface rounded-lg font-bold hover:bg-[#F4C2D7] transition-all" type="button">Buscar Archivos</button>
              </div>
            </div>

            {uploading && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm font-bold text-primary">
                  <span>Subiendo imágenes...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            {uploadedImages.length > 0 && (
              <div className="mt-8">
                <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4">Fotos Cargadas ({uploadedImages.length}):</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((imgUrl, idx) => (
                    <div key={idx} className="aspect-[4/5] rounded-xl bg-surface-container border border-outline-variant overflow-hidden relative group shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-full h-full object-cover" alt={`Cargada ${idx + 1}`} src={imgUrl} />
                      {idx === 0 && (
                        <div className="absolute top-2 left-2 bg-[#F4C2D7] text-on-primary-container text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10">
                          Principal
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeUploadedImage(idx);
                          }}
                          type="button" 
                          className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center hover:scale-110 transition-transform shadow-md cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Variants Card */}
          <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm">
            <h2 className="font-h2 text-xl mb-6 text-secondary font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">style</span>
              Variantes y Opciones
            </h2>
            <div className="space-y-8">
              {/* Sizes */}
              <div className="space-y-4">
                <label className="font-label-caps block font-bold uppercase tracking-wider text-sm text-on-surface-variant">Tallas Disponibles</label>
                <div className="flex flex-wrap gap-3">
                  {DEFAULT_SIZES.map((size) => (
                    <label key={size} className="relative cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => handleSizeToggle(size)}
                        className="peer sr-only" 
                        disabled={submitting}
                      />
                      <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low border-2 border-transparent rounded-xl text-sm font-bold text-on-surface-variant peer-checked:bg-[#F4C2D7] peer-checked:border-[#F4C2D7] peer-checked:text-on-primary-container hover:border-primary/50 transition-all select-none">
                        {size}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-label-caps block font-bold uppercase tracking-wider text-sm text-on-surface-variant">Colores Disponibles</label>
                  <button 
                    type="button"
                    onClick={() => setShowColorAdd(!showColorAdd)}
                    className="text-xs text-primary font-bold hover:underline"
                    disabled={submitting}
                  >
                    {showColorAdd ? 'Cancelar' : '+ Añadir Color'}
                  </button>
                </div>

                {showColorAdd && (
                  <div className="p-4 bg-surface-container rounded-xl border border-outline-variant flex flex-col sm:flex-row gap-4 items-end animate-scale-in max-w-md">
                    <div className="flex-1 space-y-1.5">
                      <label className="text-xs font-bold text-on-surface-variant uppercase block">Nombre de Color</label>
                      <input 
                        type="text"
                        value={newColorName}
                        onChange={(e) => setNewColorName(e.target.value)}
                        placeholder="ej. Azul Marino"
                        className="w-full bg-surface-container-low border border-outline-variant px-4 py-2 rounded-lg text-sm text-on-surface font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-on-surface-variant uppercase block">Píldora Hex</label>
                      <div className="flex gap-2">
                        <input 
                          type="color"
                          value={newColorHex}
                          onChange={(e) => setNewColorHex(e.target.value)}
                          className="w-10 h-10 border border-outline-variant rounded-lg cursor-pointer bg-transparent"
                        />
                        <input 
                          type="text"
                          value={newColorHex}
                          onChange={(e) => setNewColorHex(e.target.value)}
                          placeholder="#000000"
                          className="w-24 bg-surface-container-low border border-outline-variant px-3 py-2 rounded-lg text-sm text-on-surface font-medium uppercase"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleAddColor}
                      type="button"
                      className="px-4 py-2 bg-[#F4C2D7] text-on-primary-container font-bold rounded-lg hover:scale-105 active:scale-95 transition-all text-xs"
                    >
                      Añadir
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  {colors.map((color) => (
                    <div 
                      key={color.name}
                      className="flex items-center gap-2 p-2 pr-4 border-2 border-transparent rounded-full bg-surface-container-low group shadow-sm"
                    >
                      <div className="w-6 h-6 rounded-full shadow-inner border border-outline-variant/30" style={{ backgroundColor: color.hexCode }}></div>
                      <span className="text-xs font-bold text-on-surface">{color.name}</span>
                      <button
                        onClick={() => removeColor(color.name)}
                        type="button"
                        className="material-symbols-outlined text-xs text-on-surface-variant hover:text-error transition-colors cursor-pointer select-none"
                        disabled={submitting}
                      >
                        close
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="col-span-1 lg:col-span-4 space-y-8">
          {/* Classification */}
          <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm">
            <h2 className="font-h2 text-xl mb-6 text-secondary font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">category</span>
              Organización
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-caps block font-bold uppercase tracking-wider text-xs text-on-surface-variant">Categoría *</label>
                <div className="relative">
                  <select 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-xl px-5 py-3 transition-all text-on-surface font-medium appearance-none cursor-pointer"
                    disabled={submitting}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-label-caps block font-bold uppercase tracking-wider text-xs text-on-surface-variant">Género</label>
                <div className="relative">
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-xl px-5 py-3 transition-all text-on-surface font-medium appearance-none cursor-pointer"
                    disabled={submitting}
                  >
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-caps block font-bold uppercase tracking-wider text-xs text-on-surface-variant">Estado</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer select-none">
                    <input 
                      type="radio" 
                      name="status"
                      checked={status === 'active'}
                      onChange={() => setStatus('active')}
                      className="peer sr-only" 
                      disabled={submitting}
                    />
                    <div className="text-center py-3 bg-surface-container-low border-2 border-transparent rounded-xl text-sm font-bold text-on-surface-variant peer-checked:bg-[#F4C2D7] peer-checked:border-[#F4C2D7] peer-checked:text-on-primary-container transition-all hover:border-primary/50">ACTIVO</div>
                  </label>
                  <label className="flex-1 cursor-pointer select-none">
                    <input 
                      type="radio" 
                      name="status"
                      checked={status === 'draft'}
                      onChange={() => setStatus('draft')}
                      className="peer sr-only" 
                      disabled={submitting}
                    />
                    <div className="text-center py-3 bg-surface-container-low border-2 border-transparent rounded-xl text-sm font-bold text-on-surface-variant peer-checked:bg-[#F4C2D7] peer-checked:border-[#F4C2D7] peer-checked:text-on-primary-container transition-all hover:border-primary/50">BORRADOR</div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm">
            <h2 className="font-h2 text-xl mb-6 text-secondary font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">sell</span>
              Precios e Inventario
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-caps block font-bold uppercase tracking-wider text-xs text-on-surface-variant">Precio Base ($) *</label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">$</span>
                   <input 
                     type="number" 
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-xl pl-10 pr-5 py-3 transition-all text-on-surface font-medium" 
                     placeholder="0.00" 
                     step="0.01"
                     required
                     disabled={submitting}
                   />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label-caps block font-bold uppercase tracking-wider text-xs text-on-surface-variant">Marca</label>
                <input 
                  type="text" 
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-xl px-5 py-3 transition-all text-on-surface font-medium" 
                  placeholder="ej. Alanys" 
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps block font-bold uppercase tracking-wider text-xs text-on-surface-variant">SKU</label>
                <input 
                  type="text" 
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-xl px-5 py-3 transition-all text-on-surface font-medium" 
                  placeholder="ej. OW-2026-04" 
                  disabled={submitting}
                />
              </div>
              
              <hr className="border-outline-variant/30" />
              
              <div className="space-y-2">
                <label className="font-label-caps block font-bold uppercase tracking-wider text-xs text-on-surface-variant">Cantidad en Stock *</label>
                <input 
                  type="number" 
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-xl px-5 py-3 transition-all text-on-surface font-medium" 
                  placeholder="0" 
                  required
                  disabled={submitting}
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4 pt-4">
            <button 
              type="submit" 
              className="w-full py-4 bg-[#F4C2D7] text-on-primary-container rounded-xl font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform text-lg flex items-center justify-center gap-2 cursor-pointer"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-on-primary-container/20 border-t-on-primary-container rounded-full animate-spin"></div>
                  Guardando Cambios...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">save</span>
                  Guardar Cambios
                </>
              )}
            </button>
            <Link href="/admin/producto" className="w-full text-center py-4 border-2 border-outline-variant text-on-surface-variant rounded-xl font-bold hover:bg-surface-container-high hover:text-primary transition-all block">Cancelar</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
