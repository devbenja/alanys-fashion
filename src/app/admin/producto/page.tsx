"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { productsApi, categoriesApi, Product, Category } from '@/lib/api';

// Helper to provide premium images on the frontend dynamically as fallback
function getProductFallbackImage(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('vestido')) {
    return 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  if (n.includes('sueter') || n.includes('cachemira') || n.includes('knitwear')) {
    return 'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  if (n.includes('lino') || n.includes('trench') || n.includes('abrigo')) {
    return 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  return 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
}

export default function GestionProductosAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [selectedCategoryName, setSelectedCategoryName] = useState('Todas las Categorías');
  const [selectedStockStatus, setSelectedStockStatus] = useState('Todos los Estados');

  // Custom Modal Confirmation state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: string; name: string } | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsApi.getAll(),
        categoriesApi.getAll(),
      ]);

      if (productsRes.success && productsRes.data) {
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
      } else {
        setError(productsRes.message || 'Error al cargar inventario.');
      }

      if (categoriesRes.success && categoriesRes.data) {
        setCategories(categoriesRes.data);
      }
    } catch (err) {
      console.error('Failed to load admin inventory:', err);
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Filtering
  useEffect(() => {
    let result = products;

    // Filter by Category
    if (selectedCategoryName !== 'Todas las Categorías') {
      result = result.filter(
        (prod) => prod.category?.name.toLowerCase() === selectedCategoryName.toLowerCase()
      );
    }

    // Filter by Stock Status
    if (selectedStockStatus !== 'Todos los Estados') {
      result = result.filter((prod) => {
        const stockNum = prod.stock;
        if (selectedStockStatus === 'En Stock') return stockNum > 5;
        if (selectedStockStatus === 'Poco Stock') return stockNum > 0 && stockNum <= 5;
        if (selectedStockStatus === 'Agotado') return stockNum === 0;
        return true;
      });
    }

    setFilteredProducts(result);
  }, [selectedCategoryName, selectedStockStatus, products]);

  // Trigger Deletion Modal
  const handleDeleteClick = (id: string, name: string) => {
    setProductToDelete({ id, name });
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    setIsConfirmOpen(false);
    const { id } = productToDelete;
    setProductToDelete(null);

    try {
      const response = await productsApi.delete(id);
      if (response.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setActionSuccess('Producto eliminado del inventario correctamente.');
        setTimeout(() => setActionSuccess(null), 3000);
      } else {
        alert(response.message || 'Error al eliminar el producto.');
      }
    } catch (err) {
      console.error('Delete product failure:', err);
      alert('Error de conexión con el servidor.');
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 relative pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-3">Gestión de Inventario</h2>
          <p className="text-lg text-on-surface-variant font-medium">Gestiona tu colección de ropa y monitorea los niveles de stock en todas las categorías.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/producto/nuevo" className="bg-[#F4C2D7] text-on-primary-container px-6 py-3 rounded-xl text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span>
            Agregar Producto
          </Link>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-primary-container text-on-primary-container rounded-xl flex items-center gap-3 border border-primary/20 animate-pulse font-bold">
          <span className="material-symbols-outlined">check_circle</span>
          {actionSuccess}
        </div>
      )}
      
      {/* Filters Area */}
      <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm space-y-6">
        <div className="flex flex-wrap gap-6 items-center">
          {/* Category Filter */}
          <div className="flex items-center gap-3 px-5 py-3 bg-surface-container-high rounded-xl min-w-[240px] border border-outline-variant focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">filter_list</span>
            <select 
              value={selectedCategoryName}
              onChange={(e) => setSelectedCategoryName(e.target.value)}
              className="bg-transparent border-none text-base font-medium focus:ring-0 w-full text-on-surface outline-none cursor-pointer"
            >
              <option value="Todas las Categorías">Todas las Categorías</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          {/* Stock Filter */}
          <div className="flex items-center gap-3 px-5 py-3 bg-surface-container-high rounded-xl min-w-[240px] border border-outline-variant focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">tune</span>
            <select 
              value={selectedStockStatus}
              onChange={(e) => setSelectedStockStatus(e.target.value)}
              className="bg-transparent border-none text-base font-medium focus:ring-0 w-full text-on-surface outline-none cursor-pointer"
            >
              <option value="Todos los Estados">Todos los Estados</option>
              <option value="En Stock">En Stock (&gt; 5)</option>
              <option value="Poco Stock">Poco Stock (1 - 5)</option>
              <option value="Agotado">Agotado (0)</option>
            </select>
          </div>
          
          <div className="ml-auto text-base text-on-surface-variant font-medium">
            Mostrando <strong className="text-on-surface font-bold">{filteredProducts.length}</strong> de {products.length} productos
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-surface rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="font-bold">Cargando inventario de productos...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-on-surface-variant space-y-4">
            <span className="material-symbols-outlined text-5xl text-error">error</span>
            <h4 className="font-bold text-lg text-on-surface">No se pudo cargar el inventario</h4>
            <p className="text-sm max-w-md mx-auto">{error}</p>
            <button onClick={loadData} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-sm">
              Reintentar
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl text-outline mb-4">inventory_2</span>
            <h4 className="font-bold text-lg text-on-surface">No se encontraron productos</h4>
            <p className="text-sm mt-1">Intenta modificar tus filtros o agrega un producto nuevo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left whitespace-nowrap">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Imagen</th>
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Nombre del Producto</th>
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Categoría</th>
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Precio</th>
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Stock</th>
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-on-surface-variant text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredProducts.map((product) => {
                  // Find main image or use first one or fallback
                  const displayImage = product.images && product.images.length > 0
                    ? product.images.find(img => img.isMain)?.imageUrl || product.images[0].imageUrl
                    : getProductFallbackImage(product.name);

                  const isLowStock = product.stock > 0 && product.stock <= 5;
                  const isOutOfStock = product.stock === 0;

                  return (
                    <tr key={product.id} className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                      <td className="px-8 py-6">
                        <div className="w-12 h-16 rounded-lg bg-surface-container overflow-hidden border border-outline-variant shadow-sm relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            alt={product.name} 
                            className="h-full w-full object-cover" 
                            src={displayImage} 
                          />
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-bold text-on-surface block text-[15px]">{product.name}</span>
                        <span className="text-xs text-on-surface-variant font-medium">SKU: {product.sku || 'N/A'}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-secondary/10 border border-secondary/20 text-secondary px-3 py-1.5 rounded-full text-xs font-bold inline-block">
                          {product.category?.name || 'General'}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-bold text-on-surface text-[15px]">${product.price}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-16 bg-surface-container-high rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${isOutOfStock ? 'bg-outline-variant' : isLowStock ? 'bg-error' : 'bg-primary'}`} 
                              style={{ width: `${Math.min(100, (product.stock / 20) * 100)}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-bold ${isOutOfStock ? 'text-on-surface-variant' : isLowStock ? 'text-error' : 'text-on-surface'}`}>
                            {product.stock}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/producto/editar/${product.id}`}
                            className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-all cursor-pointer"
                            title="Editar Producto"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </Link>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(product.id, product.name);
                            }}
                            className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-all cursor-pointer"
                            title="Eliminar Producto"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Premium Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
          <div className="bg-surface border border-outline-variant max-w-md w-full rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center transform scale-100 transition-transform duration-300 animate-scale-in">
            {/* Warning Icon Badge */}
            <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mb-6 scale-110">
              <span className="material-symbols-outlined text-4xl">warning</span>
            </div>
            
            <h3 className="text-2xl font-black text-primary mb-3 font-dm-sans">¿Eliminar Producto?</h3>
            <p className="text-on-surface-variant font-medium mb-8 leading-relaxed text-sm">
              ¿Estás seguro de que deseas eliminar el producto <strong className="text-on-surface font-bold">"{productToDelete?.name}"</strong>? Esta acción lo borrará permanentemente del inventario de forma irreversible.
            </p>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={handleCancelDelete}
                className="flex-1 py-3.5 border-2 border-outline-variant text-on-surface rounded-xl font-bold hover:bg-surface-container-high hover:border-on-surface transition-all active:scale-95 cursor-pointer text-sm"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="flex-1 py-3.5 bg-error text-on-error rounded-xl font-bold shadow-lg shadow-error/30 hover:scale-[1.02] hover:bg-error-container hover:text-on-error-container transition-all active:scale-95 cursor-pointer text-sm"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom self-contained CSS styles for bounciness & glassmorphic fade-ins */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
}
