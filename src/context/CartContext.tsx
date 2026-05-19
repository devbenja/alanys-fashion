"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialMockData: CartItem[] = [
  {
    id: "stitch-1",
    name: "Collar \"Sugar Pop\"",
    price: "$45.00",
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO6LPiKIG1ztlvuVsl-yJM3-H-vPiCjYufzQ22kETf9FvH7TpeMlZFN9tJNf-U9lxPgWX9NPE2hVHGok6xoWSh6TVQyztAAiuGCttI3djniDG0d-gVfZNmaqAjdXXloirl8N1kSnyB7FxhvQ7p5XKJ-SFvoXTJCQ0BesB-zquonjbwDHaV3ygih8vlrg5N88A1KfmOqJGuYLju8xCOLpvwDwLJxxbZNHBnoEysYNs4PpTIF9tEJ-BZfnCNnU4Gyht6slSBhCLojFfn"
  },
  {
    id: "stitch-2",
    name: "Pendientes \"Heart Beat\"",
    price: "$28.50",
    quantity: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr0Nn8gWilfQYF_miu5jrkO9aJK_nZcOnKl28bOUUVKlnJfzaqWAHVb42Nr5HdJYvgNJhiwsWuWYzW9JGPIH9kRZugwtluqofLAtI2ubCGCjbcpuSMjoKCX_cFVBk91JIa1-P4h6-Xm7eGplf90XVVXMKD2sJjFwyH8ARdDcUAnIsSWe9YNZAAIHQ_T13-2MsFDvZ3LVUZ7BBGq-3CKN6e9tpyG7lDHdTkPqs5ItfzvPRHRQ1NLyTCPaBtbuuwXTNpGuVmzwSs-fKa"
  },
  {
    id: "stitch-3",
    name: "Anillo \"Chunky Grape\"",
    price: "$15.00",
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpzeCNNJOysrCFUed4fxQpc6WqbRFADRJVJ05oCOrSf8a_p9ZQEdDLl5vsxhJ41XjDe0ejbz1vI5mNwJ4_3IGF6Bx33jN2Y0BbkRllpocWetiAop5DPALK0IZeg0AqigC2kQUC2wwYKMn9lb6zy61DJSzransYu7nrR9GiSyjIm2y9mc1aoG9yusCMqfO0_ceFXQqDHJAnTaNMmunl3_MSBpa_Dwua31xHH8hfLiRTSGVXdtib0pAe-7irx87z5HMHcoE85I4LJAe5"
  }
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialMockData);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('alanys_cart_v2');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        // First time load: use mock data
        setCartItems(initialMockData);
        localStorage.setItem('alanys_cart_v2', JSON.stringify(initialMockData));
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('alanys_cart_v2', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true); // Auto-open cart when adding items
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  // Calculate total by removing '$' and parsing
  const cartTotal = cartItems.reduce((total, item) => {
    const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + priceValue * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
