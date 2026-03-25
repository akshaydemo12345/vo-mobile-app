export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  value: string;
  available: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  category: string;
  categoryId: string;
  tags: string[];
  badge?: 'trending' | 'new' | 'sale' | 'hot' | 'bestseller';
  inStock: boolean;
  stockCount?: number;
  sizes?: ProductVariant[];
  colors?: ProductVariant[];
  reviews?: Review[];
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  productCount?: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  backgroundColor: string;
  categoryId?: string;
  ctaText: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'wallet' | 'cod';
  label: string;
  last4?: string;
  upiId?: string;
  icon: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  address: Address;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  trackingId?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percent' | 'flat';
  minOrder?: number;
  maxDiscount?: number;
}

export interface Filters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
  search?: string;
}
