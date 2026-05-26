const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Generic API request wrapper using native fetch
 */
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;
  const headers = new Headers();
  
  if (!(body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
  }

  const options: RequestInit = {
    method,
    headers,
    // credentials: 'include' allows sending and receiving cookies like JWT tokens
    credentials: 'include',
  };

  if (body) {
    options.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    
    // Attempt to parse JSON response. Even for non-2xx status, Express APIs return JSON error messages
    let data;
    try {
      data = await response.json();
    } catch {
      data = { success: false, message: response.statusText };
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Error del servidor: ${response.status}`,
        error: data.error,
      };
    }

    return data;
  } catch (error: any) {
    console.error(`API request failed for ${method} ${endpoint}:`, error);
    return {
      success: false,
      message: 'No se pudo establecer conexión con el servidor.',
      error: error.message,
    };
  }
}

/**
 * Categories Service
 */
export const categoriesApi = {
  /**
   * Get all categories
   */
  getAll: async () => {
    return apiRequest<Category[]>('/categories');
  },

  /**
   * Get a category by its ID
   */
  getById: async (id: string) => {
    return apiRequest<Category>(`/categories/${id}`);
  },

  /**
   * Create a new category (requires admin privileges)
   */
  create: async (data: { name: string; description?: string }) => {
    return apiRequest<Category>('/categories', 'POST', data);
  },

  /**
   * Update an existing category (requires admin privileges)
   */
  update: async (id: string, data: { name?: string; description?: string }) => {
    return apiRequest<Category>(`/categories/${id}`, 'PUT', data);
  },

  /**
   * Delete a category by its ID (requires admin privileges)
   */
  delete: async (id: string) => {
    return apiRequest<any>(`/categories/${id}`, 'DELETE');
  },
};

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  isMain: boolean;
  createdAt: string;
}

export interface ProductSize {
  id: string;
  productId: string;
  size: string;
  stock: number;
}

export interface ProductColor {
  id: string;
  productId: string;
  colorName: string;
  hexCode?: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: string | number;
  stock: number;
  sku?: string;
  brand?: string;
  gender?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
  };
  images?: ProductImage[];
  sizes?: ProductSize[];
  colors?: ProductColor[];
}

/**
 * Products and Variants Service
 */
export const productsApi = {
  /**
   * Get all products
   */
  getAll: async () => {
    return apiRequest<Product[]>('/products');
  },

  /**
   * Get a single product with all its variant lists
   */
  getById: async (id: string) => {
    return apiRequest<Product>(`/products/${id}`);
  },

  /**
   * Create a new product base
   */
  create: async (data: {
    categoryId: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    sku?: string;
    brand?: string;
    gender?: string;
    status?: string;
  }) => {
    return apiRequest<Product>('/products', 'POST', data);
  },

  /**
   * Update an existing product
   */
  update: async (id: string, data: Partial<Product>) => {
    return apiRequest<Product>(`/products/${id}`, 'PUT', data);
  },

  /**
   * Delete a product
   */
  delete: async (id: string) => {
    return apiRequest<any>(`/products/${id}`, 'DELETE');
  },

  // --- Variants Sub-Service ---

  /**
   * Add an image to a product
   */
  addImage: async (productId: string, data: { imageUrl: string; isMain?: boolean }) => {
    return apiRequest<ProductImage>(`/products/${productId}/images`, 'POST', data);
  },

  /**
   * Set an image as the main image of a product
   */
  setMainImage: async (productId: string, imageId: string) => {
    return apiRequest<ProductImage>(`/products/${productId}/images/${imageId}/main`, 'PUT');
  },

  /**
   * Delete an image from a product
   */
  deleteImage: async (productId: string, imageId: string) => {
    return apiRequest<any>(`/products/${productId}/images/${imageId}`, 'DELETE');
  },

  /**
   * Add a size variant with stock to a product
   */
  addSize: async (productId: string, data: { size: string; stock: number }) => {
    return apiRequest<ProductSize>(`/products/${productId}/sizes`, 'POST', data);
  },

  /**
   * Delete a size variant from a product
   */
  deleteSize: async (productId: string, sizeId: string) => {
    return apiRequest<any>(`/products/${productId}/sizes/${sizeId}`, 'DELETE');
  },

  /**
   * Add a color variant to a product
   */
  addColor: async (productId: string, data: { colorName: string; hexCode?: string }) => {
    return apiRequest<ProductColor>(`/products/${productId}/colors`, 'POST', data);
  },

  /**
   * Delete a color variant from a product
   */
  deleteColor: async (productId: string, colorId: string) => {
    return apiRequest<any>(`/products/${productId}/colors/${colorId}`, 'DELETE');
  },
};
