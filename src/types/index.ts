export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  category: string;
  badge?: 'trending' | 'sale' | 'new';
  variants?: ProductVariant[];
  inStock: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  options: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
  addedAt: string;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'wallet';
  name: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  trackingId?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  selectedVariants?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

export interface Banner {
  id: string;
  image: string;
  title?: string;
  action?: string;
  link?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  createdAt: string;
}

export interface PriceBreakdown {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  isActive: boolean;
  expiryDate: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OTPVerifyRequest {
  phone: string;
  otp: string;
}

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  OTP: { phone: string };
  ForgotPassword: undefined;
};

export type AppStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
  SearchResults: { query: string };
  OrderTracking: { orderId: string };
};

export type MainTabsParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
  Wishlist: undefined;
};
