"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { categoriesApi, Category } from '@/lib/api';

// Helper to provide premium images on the frontend dynamically based on category name
function getCategoryImage(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('vestido')) {
    return 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  if (n.includes('blusa') || n.includes('top') || n.includes('sueter') || n.includes('camisa')) {
    return 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  if (n.includes('abrigo') || n.includes('chaqueta') || n.includes('saco')) {
    return 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  if (n.includes('zapato') || n.includes('calzado') || n.includes('bota') || n.includes('tacon')) {
    return 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  }
  // Default Accessories image
  return 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
}

export default function CategoriasAdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Custom Modal Confirmation state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string } | null>(null);

  // Edit Mode state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || '');
    setFormError(null);
    setFormSuccess(null);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setFormError(null);
    setFormSuccess(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoriesApi.getAll();
      if (response.success && response.data) {
        setCategories(response.data);
      } else {
        setError(response.message || 'Error al cargar las categorías');
      }
    } catch (err: any) {
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('El nombre de la categoría es obligatorio.');
      return;
    }

    setSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      if (editingCategory) {
        // Edit Mode
        const response = await categoriesApi.update(editingCategory.id, {
          name: name.trim(),
          description: description.trim() || undefined,
        });

        if (response.success && response.data) {
          setFormSuccess('¡Categoría actualizada con éxito!');
          setEditingCategory(null);
          setName('');
          setDescription('');
          
          // Update category in list
          setCategories((prev) =>
            prev.map((c) => (c.id === response.data!.id ? response.data! : c))
          );
          
          setTimeout(() => setFormSuccess(null), 3000);
        } else {
          setFormError(response.message || 'Error al actualizar la categoría.');
        }
      } else {
        // Create Mode
        const response = await categoriesApi.create({
          name: name.trim(),
          description: description.trim() || undefined,
        });

        if (response.success && response.data) {
          setFormSuccess('¡Categoría creada con éxito!');
          setName('');
          setDescription('');
          setCategories((prev) => [response.data!, ...prev]);
          setTimeout(() => setFormSuccess(null), 3000);
        } else {
          setFormError(response.message || 'Error al crear la categoría.');
        }
      }
    } catch (err: any) {
      setFormError('Error al conectar con el servidor.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (id: string, name: string) => {
    setCategoryToDelete({ id, name });
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    
    setIsConfirmOpen(false);
    const { id } = categoryToDelete;
    setCategoryToDelete(null);

    try {
      const response = await categoriesApi.delete(id);
      if (response.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setFormSuccess('Categoría eliminada correctamente.');
        setTimeout(() => setFormSuccess(null), 3000);
      } else {
        setFormError(response.message || 'No se pudo eliminar la categoría.');
        setTimeout(() => setFormError(null), 4000);
      }
    } catch (err: any) {
      setFormError('Error de conexión al eliminar la categoría.');
      setTimeout(() => setFormError(null), 4000);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 relative pb-20">
      {/* Page Navigation Header */}
      <div className="flex flex-col gap-3">
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant font-medium font-dm-sans">
          <Link className="hover:text-primary transition-colors" href="/admin">Panel</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-secondary font-bold">Categorías</span>
        </nav>
        <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-3">Gestión de Categorías</h2>
        <p className="text-lg text-on-surface-variant font-medium">Crea, edita y visualiza las categorías de productos disponibles en tu tienda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: List Categories */}
        <div className="col-span-1 lg:col-span-7 space-y-6">
          <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm flex flex-col">
            <h3 className="text-2xl font-black text-secondary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">view_list</span>
              Categorías Existentes ({categories.length})
            </h3>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-on-surface-variant gap-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="font-bold">Cargando categorías...</p>
              </div>
            ) : error ? (
              <div className="p-6 bg-error-container text-on-error-container rounded-xl flex items-center gap-4 border border-error/20">
                <span className="material-symbols-outlined text-3xl">error</span>
                <div>
                  <h4 className="font-bold">Hubo un problema</h4>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
                <button 
                  onClick={fetchCategories} 
                  className="ml-auto bg-surface text-error font-bold px-4 py-2 rounded-lg text-xs hover:bg-error-container/50 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            ) : categories.length === 0 ? (
              <div className="py-20 border-2 border-dashed border-outline-variant rounded-xl text-center bg-surface-container/30">
                <span className="material-symbols-outlined text-5xl text-outline mb-4">folder_open</span>
                <h4 className="font-bold text-lg text-on-surface">No hay categorías registradas</h4>
                <p className="text-on-surface-variant text-sm mt-1">Usa el formulario de la derecha para registrar la primera.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className="group relative overflow-hidden rounded-xl border border-outline-variant bg-surface flex flex-col shadow-sm transition-all hover:shadow-md hover:-translate-y-1 bouncy-hover"
                  >
                    {/* Background Category Image (Rendered purely frontend dynamically) */}
                    <div className="h-40 relative bg-surface-container overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={getCategoryImage(category.name)} 
                        alt={category.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Edit Badge Button */}
                      <button 
                        onClick={() => handleEditClick(category)}
                        className="absolute top-3 right-13 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-md hover:scale-110 active:scale-95 transition-all z-20"
                        title="Editar Categoría"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>

                      {/* Delete Badge Button */}
                      <button 
                        onClick={() => handleDeleteClick(category.id, category.name)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-error text-on-error flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-md hover:scale-110 active:scale-95 transition-all z-20"
                        title="Eliminar Categoría"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>

                    {/* Description Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-black text-xl text-primary">{category.name}</h4>
                        <p className="text-sm text-on-surface-variant font-medium mt-2 line-clamp-2">
                          {category.description || 'Sin descripción disponible.'}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs text-on-surface-variant font-bold">
                        <span>Creado recientemente</span>
                        <span className="px-2.5 py-1 bg-surface-container text-on-surface rounded-md border border-outline-variant/20 uppercase tracking-widest text-[10px]">
                          Activo
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Create Category Form */}
        <div className="col-span-1 lg:col-span-5 space-y-6">
          <div className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-sm">
            <h3 className="text-2xl font-black text-secondary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">
                {editingCategory ? 'edit' : 'add_circle'}
              </span>
              {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
            </h3>

            {formSuccess && (
              <div className="mb-6 p-4 bg-primary-container text-on-primary-container rounded-xl flex items-center gap-3 border border-primary/20 animate-pulse">
                <span className="material-symbols-outlined">check_circle</span>
                <span className="font-bold text-sm">{formSuccess}</span>
              </div>
            )}

            {formError && (
              <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-3 border border-error/20">
                <span className="material-symbols-outlined">warning</span>
                <span className="font-bold text-sm">{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Name Input */}
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-xs">Nombre de Categoría *</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-xl px-5 py-3 transition-all text-on-surface font-medium" 
                  placeholder="ej. Vestidos de Gala, Blusas, Accesorios..." 
                  disabled={submitting}
                  required
                />
              </div>

              {/* Description textarea */}
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant block font-bold uppercase tracking-wider text-xs">Descripción</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none rounded-xl px-5 py-3 transition-all text-on-surface font-medium" 
                  placeholder="Describe qué tipos de productos pertenecen a esta categoría..." 
                  rows={6}
                  disabled={submitting}
                ></textarea>
              </div>

              {/* Submit button */}
              <button 
                type="submit" 
                className="w-full py-4 bg-[#F4C2D7] text-on-primary-container rounded-xl font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform text-lg flex items-center justify-center gap-2"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-on-primary-container/20 border-t-on-primary-container rounded-full animate-spin"></div>
                    {editingCategory ? 'Guardando...' : 'Creando...'}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">save</span>
                    {editingCategory ? 'Guardar Cambios' : 'Guardar Categoría'}
                  </>
                )}
              </button>

              {editingCategory && (
                <button 
                  type="button" 
                  onClick={handleCancelEdit}
                  className="w-full py-3.5 border-2 border-outline-variant text-on-surface-variant rounded-xl font-bold hover:bg-surface-container-high transition-transform text-sm flex items-center justify-center gap-2 mt-2"
                  disabled={submitting}
                >
                  <span className="material-symbols-outlined text-sm">cancel</span>
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Premium Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
          <div className="bg-surface border border-outline-variant max-w-md w-full rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center transform scale-100 transition-transform duration-300 animate-scale-in">
            {/* Warning Icon Badge */}
            <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mb-6 scale-110">
              <span className="material-symbols-outlined text-4xl">warning</span>
            </div>
            
            <h3 className="text-2xl font-black text-primary mb-3 font-dm-sans">¿Eliminar Categoría?</h3>
            <p className="text-on-surface-variant font-medium mb-8 leading-relaxed text-sm">
              ¿Estás seguro de que deseas eliminar la categoría <strong className="text-on-surface font-bold">"{categoryToDelete?.name}"</strong>? Esta acción no se puede deshacer y podría afectar a los productos asociados.
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
