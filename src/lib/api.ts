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

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  isActive: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  role?: string;
}

/**
 * Authentication Service
 */
export const authApi = {
  /**
   * Log in user
   */
  login: async (credentials: LoginCredentials) => {
    return apiRequest<AuthUser>('/auth/login', 'POST', credentials);
  },

  /**
   * Register a new user
   */
  register: async (data: RegisterData) => {
    return apiRequest<AuthUser>('/auth/register', 'POST', data);
  },

  /**
   * Log out current user
   */
  logout: async () => {
    return apiRequest<any>('/auth/logout', 'POST');
  },

  /**
   * Get current authenticated user profile
   */
  me: async () => {
    return apiRequest<AuthUser>('/auth/me', 'GET');
  },
};

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CheckoutSessionResponse {
  url: string;
}

export interface OrderTracking {
  status: string;
  description: string;
  createdAt: string;
}

export interface OrderPayment {
  id: string;
  provider: string;
  providerPaymentId: string;
  amount: string;
  currency: string;
  paymentStatus: string;
  paidAt: string | null;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
  product: {
    name: string;
    images: { imageUrl: string; isMain: boolean }[];
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  stripeSessionId?: string;
  subtotal: string;
  shippingCost: string;
  total: string;
  paymentStatus: string;
  orderStatus: string;
  trackingCode: string | null;
  createdAt: string;
  items: OrderItem[];
  tracking: OrderTracking[];
  payments?: OrderPayment[];
}

const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  processing: 'En Proceso',
  paid: 'Pagado',
  cancelled: 'Cancelado',
  delivered: 'Entregado',
};

const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  paid: 'bg-green-100 text-green-700',
  cancelled: 'bg-slate-100 text-slate-500',
  delivered: 'bg-green-100 text-green-700',
};

const ORDER_STATUS_ICONS: Record<string, string> = {
  pending: 'schedule',
  processing: 'local_shipping',
  paid: 'check_circle',
  cancelled: 'cancel',
  delivered: 'check_circle',
};

export function getOrderStatusInfo(status: string) {
  return {
    label: ORDER_STATUS_LABELS[status] || status,
    color: ORDER_STATUS_COLORS[status] || 'bg-slate-100 text-slate-500',
    icon: ORDER_STATUS_ICONS[status] || 'info',
  };
}

/**
 * Payments Service
 */
export const paymentsApi = {
  createCheckoutSession: async (items: CartItem[]) => {
    return apiRequest<CheckoutSessionResponse>('/payments/create-checkout-session', 'POST', { items });
  },
};

/**
 * Orders Service
 */
export const ordersApi = {
  getAll: async () => {
    return apiRequest<Order[]>('/orders', 'GET');
  },

  getById: async (id: string) => {
    return apiRequest<Order>(`/orders/${id}`, 'GET');
  },

  cancel: async (sessionId: string) => {
    return apiRequest<void>('/orders/cancel', 'POST', { sessionId });
  },
};

export interface AdminOrder extends Order {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface AdminOrdersResponse extends ApiResponse<AdminOrder[]> {
  meta?: PaginationMeta;
}

export const adminOrdersApi = {
  getAll: async (params?: { status?: string; page?: number; limit?: number }): Promise<AdminOrdersResponse> => {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    const qs = query.toString();
    const res = await apiRequest<AdminOrder[]>(`/orders/admin${qs ? `?${qs}` : ''}`, 'GET');
    return res as AdminOrdersResponse;
  },

  getById: async (id: string) => {
    return apiRequest<AdminOrder>(`/orders/admin/${id}`, 'GET');
  },

  updateStatus: async (id: string, data: { status: string; description?: string; trackingCode?: string }) => {
    return apiRequest<AdminOrder>(`/orders/admin/${id}/status`, 'PUT', data);
  },
};


