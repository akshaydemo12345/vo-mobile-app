import type { Product, Category, Banner, Review, Address, Order, PaymentMethod } from '../types/models';

// ─── Reviews ────────────────────────────────────────────────────────────────
const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userId: 'u2',
    userName: 'Aarav Sharma',
    rating: 5,
    comment: 'Absolutely love this product! Build quality is exceptional and performance is top notch. Worth every rupee.',
    createdAt: '2024-11-15T10:00:00Z',
    helpful: 32,
  },
  {
    id: 'r2',
    userId: 'u3',
    userName: 'Priya Mehta',
    rating: 4,
    comment: 'Great product overall. Battery life is impressive. Minor issue with the packaging but the product itself is perfect.',
    createdAt: '2024-11-10T14:30:00Z',
    helpful: 18,
  },
  {
    id: 'r3',
    userId: 'u4',
    userName: 'Rohan Kapoor',
    rating: 5,
    comment: 'Exceeded my expectations! The sound quality is phenomenal and the noise cancellation is brilliant.',
    createdAt: '2024-11-05T09:20:00Z',
    helpful: 24,
  },
  {
    id: 'r4',
    userId: 'u5',
    userName: 'Sneha Joshi',
    rating: 3,
    comment: 'Good product but a bit overpriced. Quality is decent but I expected more at this price range.',
    createdAt: '2024-10-28T16:45:00Z',
    helpful: 8,
  },
];

// ─── Categories ──────────────────────────────────────────────────────────────
export const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Electronics', icon: 'flash', color: '#6C63FF', productCount: 248 },
  { id: 'c2', name: 'Fashion', icon: 'shirt', color: '#FF6B6B', productCount: 512 },
  { id: 'c3', name: 'Home', icon: 'home', color: '#F59E0B', productCount: 183 },
  { id: 'c4', name: 'Sports', icon: 'football', color: '#22C55E', productCount: 97 },
  { id: 'c5', name: 'Beauty', icon: 'sparkles', color: '#EC4899', productCount: 321 },
  { id: 'c6', name: 'Books', icon: 'book', color: '#3B82F6', productCount: 1204 },
  { id: 'c7', name: 'Kitchen', icon: 'restaurant', color: '#F97316', productCount: 144 },
  { id: 'c8', name: 'Toys', icon: 'game-controller', color: '#8B5CF6', productCount: 88 },
];

// ─── Banners ─────────────────────────────────────────────────────────────────
export const MOCK_BANNERS: Banner[] = [
  {
    id: 'b1',
    title: 'Summer Sale',
    subtitle: 'Up to 60% off on Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    backgroundColor: '#1A1040',
    categoryId: 'c1',
    ctaText: 'Shop Now',
  },
  {
    id: 'b2',
    title: 'New Arrivals',
    subtitle: 'Latest Fashion Trends 2025',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    backgroundColor: '#1A0A0A',
    categoryId: 'c2',
    ctaText: 'Explore',
  },
  {
    id: 'b3',
    title: 'Home Makeover',
    subtitle: 'Transform your living space',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    backgroundColor: '#0A1A0F',
    categoryId: 'c3',
    ctaText: 'Discover',
  },
  {
    id: 'b4',
    title: 'Flash Deal',
    subtitle: 'Today only — extra 15% off',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    backgroundColor: '#1A0F00',
    categoryId: undefined,
    ctaText: 'Grab Deal',
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    description:
      'Industry-leading noise canceling with two processors and eight microphones. Exceptional sound quality with Auto NC Optimizer. Up to 30-hour battery life with quick charging. Crystal clear hands-free calling. Multipoint connection allows pairing with two Bluetooth devices simultaneously.',
    price: 24999,
    originalPrice: 34990,
    discount: 28,
    rating: 4.7,
    reviewCount: 4821,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', alt: 'Sony WH-1000XM5 front view' },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80', alt: 'Headphones side view' },
      { id: 'i3', url: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&q=80', alt: 'Headphones in case' },
    ],
    category: 'Electronics',
    categoryId: 'c1',
    tags: ['wireless', 'noise-canceling', 'premium'],
    badge: 'bestseller',
    inStock: true,
    stockCount: 23,
    colors: [
      { id: 'col1', label: 'Midnight Black', value: '#1A1A1A', available: true },
      { id: 'col2', label: 'Platinum Silver', value: '#C0C0C0', available: true },
    ],
    reviews: MOCK_REVIEWS,
    isFeatured: true,
  },
  {
    id: 'p2',
    title: 'Apple Watch Series 9 GPS 45mm',
    description:
      'The most powerful Apple Watch ever. Features S9 SiP chip with double tap gesture. Advanced health monitoring with blood oxygen, ECG, and temperature sensing. Crack-resistant front crystal. The brighter, faster, more powerful Apple Watch.',
    price: 41900,
    originalPrice: 44900,
    discount: 7,
    rating: 4.8,
    reviewCount: 6230,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80', alt: 'Apple Watch Series 9' },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80', alt: 'Watch on wrist' },
    ],
    category: 'Electronics',
    categoryId: 'c1',
    tags: ['smartwatch', 'apple', 'fitness'],
    badge: 'trending',
    inStock: true,
    stockCount: 8,
    colors: [
      { id: 'col1', label: 'Midnight', value: '#1C1C1E', available: true },
      { id: 'col2', label: 'Starlight', value: '#F5F5DC', available: true },
      { id: 'col3', label: 'Product Red', value: '#FF3B30', available: false },
    ],
    reviews: MOCK_REVIEWS.slice(0, 2),
    isFeatured: true,
  },
  {
    id: 'p3',
    title: 'Nike Air Max 270 Running Shoes',
    description:
      'The Nike Air Max 270 is inspired by two icons of big Air: the Air Max 180 and Air Max 93. It features Nike\'s biggest heel Air unit yet, for a super-soft ride that feels as impossible as it looks.',
    price: 8995,
    originalPrice: 12995,
    discount: 31,
    rating: 4.4,
    reviewCount: 2145,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', alt: 'Nike Air Max 270' },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80', alt: 'Shoe side view' },
    ],
    category: 'Sports',
    categoryId: 'c4',
    tags: ['shoes', 'running', 'nike'],
    badge: 'sale',
    inStock: true,
    sizes: [
      { id: 's1', label: 'UK 6', value: '6', available: true },
      { id: 's2', label: 'UK 7', value: '7', available: true },
      { id: 's3', label: 'UK 8', value: '8', available: true },
      { id: 's4', label: 'UK 9', value: '9', available: true },
      { id: 's5', label: 'UK 10', value: '10', available: false },
      { id: 's6', label: 'UK 11', value: '11', available: true },
    ],
    colors: [
      { id: 'col1', label: 'Black/White', value: '#000000', available: true },
      { id: 'col2', label: 'Royal Blue', value: '#4169E1', available: true },
    ],
    reviews: MOCK_REVIEWS.slice(1, 3),
  },
  {
    id: 'p4',
    title: 'Levi\'s 511 Slim Fit Jeans',
    description:
      'The 511 Slim Fit Jean is a modern slim that sits below the waist and is slim through the thigh with a narrow leg opening. Made with soft denim that moves with you.',
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.3,
    reviewCount: 1876,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80', alt: "Levi's 511 jeans" },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80', alt: 'Jeans detail' },
    ],
    category: 'Fashion',
    categoryId: 'c2',
    tags: ['jeans', 'denim', 'levis'],
    badge: 'sale',
    inStock: true,
    sizes: [
      { id: 's1', label: '28x30', value: '28x30', available: true },
      { id: 's2', label: '30x30', value: '30x30', available: true },
      { id: 's3', label: '32x30', value: '32x30', available: true },
      { id: 's4', label: '34x30', value: '34x30', available: false },
    ],
    colors: [
      { id: 'col1', label: 'Dark Indigo', value: '#1E2C5C', available: true },
      { id: 'col2', label: 'Medium Wash', value: '#5B7FA6', available: true },
    ],
  },
  {
    id: 'p5',
    title: 'boAt Rockerz 550 Over-Ear Headphones',
    description:
      'Premium sound quality with 40mm dynamic drivers. Up to 20 hours playback on single charge. Plush padded ear cushions for all-day comfort. Built-in mic for hands-free calling. Foldable design for easy portability.',
    price: 1499,
    originalPrice: 3990,
    discount: 62,
    rating: 4.2,
    reviewCount: 12847,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80', alt: 'boAt headphones' },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80', alt: 'Headphones lifestyle' },
    ],
    category: 'Electronics',
    categoryId: 'c1',
    tags: ['headphones', 'wireless', 'boat'],
    badge: 'hot',
    inStock: true,
    colors: [
      { id: 'col1', label: 'Black', value: '#000000', available: true },
      { id: 'col2', label: 'Cobalt Blue', value: '#0047AB', available: true },
      { id: 'col3', label: 'Luscious Red', value: '#C41E3A', available: true },
    ],
    isFeatured: true,
  },
  {
    id: 'p6',
    title: 'IKEA KALLAX Shelf Unit',
    description:
      'A simple shelf unit that becomes a perfect organizer for books, plants, and more. Can be used both vertically and horizontally. May be completed with boxes, inserts, and drawers sold separately.',
    price: 5999,
    originalPrice: 7499,
    discount: 20,
    rating: 4.5,
    reviewCount: 3421,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', alt: 'KALLAX shelf unit' },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', alt: 'Shelf styled interior' },
    ],
    category: 'Home',
    categoryId: 'c3',
    tags: ['shelf', 'storage', 'ikea'],
    inStock: true,
    colors: [
      { id: 'col1', label: 'White', value: '#FFFFFF', available: true },
      { id: 'col2', label: 'Black-Brown', value: '#1C0F00', available: true },
    ],
  },
  {
    id: 'p7',
    title: "L'Oreal Paris Revitalift Night Cream",
    description:
      'Anti-ageing night cream with Pro-Retinol and Niacinamide. Visibly reduces wrinkles and firms skin overnight. Deeply nourishes and repairs skin while you sleep. Dermatologically tested formula.',
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.1,
    reviewCount: 8912,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80', alt: 'Night cream' },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80', alt: 'Skincare routine' },
    ],
    category: 'Beauty',
    categoryId: 'c5',
    tags: ['skincare', 'night cream', 'anti-aging'],
    badge: 'new',
    inStock: true,
  },
  {
    id: 'p8',
    title: 'Samsung 65" 4K QLED Smart TV',
    description:
      'Quantum Dot technology for a billion shades of brilliant color. Real Game Enhancer+ for the ultimate gaming experience. Object Tracking Sound Pro syncs audio with on-screen movement. Built-in Alexa and Google Assistant.',
    price: 89990,
    originalPrice: 129990,
    discount: 31,
    rating: 4.6,
    reviewCount: 2104,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80', alt: 'Samsung 4K TV' },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80', alt: 'TV in living room' },
    ],
    category: 'Electronics',
    categoryId: 'c1',
    tags: ['tv', 'samsung', '4k', 'qled'],
    badge: 'trending',
    inStock: true,
    stockCount: 5,
    isFeatured: true,
  },
  {
    id: 'p9',
    title: 'Prestige Iris 750W Mixer Grinder',
    description:
      '3 jars: 1.5L liquidizing jar, 1L dry grinding jar, 0.4L chutney jar. 3-speed control with pulse function. Anti-vibration technology. Auto-start after power failure. ISI marked for safety.',
    price: 2299,
    originalPrice: 3995,
    discount: 42,
    rating: 4.3,
    reviewCount: 15670,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80', alt: 'Mixer grinder' },
    ],
    category: 'Kitchen',
    categoryId: 'c7',
    tags: ['mixer', 'kitchen', 'prestige'],
    inStock: true,
  },
  {
    id: 'p10',
    title: 'Atomic Habits by James Clear',
    description:
      'The #1 New York Times bestseller. Learn how tiny changes in behavior can lead to remarkable results. James Clear presents a proven framework for improving every day.',
    price: 399,
    originalPrice: 699,
    discount: 43,
    rating: 4.8,
    reviewCount: 28543,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80', alt: 'Atomic Habits book' },
    ],
    category: 'Books',
    categoryId: 'c6',
    tags: ['self-help', 'habits', 'bestseller'],
    badge: 'bestseller',
    inStock: true,
  },
  {
    id: 'p11',
    title: 'OnePlus 12 5G 256GB',
    description:
      'Snapdragon 8 Gen 3 processor with 12GB RAM. Hasselblad-tuned 50MP triple camera system. 5400mAh battery with 100W SUPERVOOC charging. 6.82" AMOLED ProXDR display with 120Hz refresh rate.',
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    rating: 4.5,
    reviewCount: 3876,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80', alt: 'OnePlus 12' },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80', alt: 'Smartphone lifestyle' },
    ],
    category: 'Electronics',
    categoryId: 'c1',
    tags: ['smartphone', 'oneplus', '5g'],
    badge: 'new',
    inStock: true,
    colors: [
      { id: 'col1', label: 'Silky Black', value: '#1C1C1C', available: true },
      { id: 'col2', label: 'Flowy Emerald', value: '#2E6B4F', available: true },
    ],
    isFeatured: true,
  },
  {
    id: 'p12',
    title: 'Puma Men\'s Softride Running Shoes',
    description:
      'SoftFoam+ sockliner for superior step-in comfort. Compression-molded EVA midsole for a cushioned ride. Rubber outsole for enhanced traction. Mesh upper for breathability.',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.2,
    reviewCount: 987,
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80', alt: 'Puma running shoes' },
    ],
    category: 'Sports',
    categoryId: 'c4',
    tags: ['shoes', 'running', 'puma'],
    inStock: true,
    sizes: [
      { id: 's1', label: 'UK 6', value: '6', available: true },
      { id: 's2', label: 'UK 7', value: '7', available: true },
      { id: 's3', label: 'UK 8', value: '8', available: true },
      { id: 's4', label: 'UK 9', value: '9', available: true },
    ],
  },
];

// ─── Addresses ───────────────────────────────────────────────────────────────
export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'a1',
    label: 'Home',
    fullName: 'Rahul Verma',
    phone: '9876543210',
    line1: '42, Rajiv Gandhi Nagar',
    line2: 'Near City Mall',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    country: 'India',
    isDefault: true,
  },
  {
    id: 'a2',
    label: 'Office',
    fullName: 'Rahul Verma',
    phone: '9876543210',
    line1: '3rd Floor, Tech Park',
    line2: 'Outer Ring Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    country: 'India',
    isDefault: false,
  },
];

// ─── Payment Methods ─────────────────────────────────────────────────────────
export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm1', type: 'card', label: 'HDFC Credit Card', last4: '4242', icon: 'card' },
  { id: 'pm2', type: 'upi', label: 'Google Pay UPI', upiId: 'rahul@okaxis', icon: 'phone-portrait' },
  { id: 'pm3', type: 'wallet', label: 'Paytm Wallet', icon: 'wallet' },
  { id: 'pm4', type: 'cod', label: 'Cash on Delivery', icon: 'cash' },
];

// ─── Orders ──────────────────────────────────────────────────────────────────
export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1',
    orderNumber: 'SZ2024110001',
    items: [
      { product: MOCK_PRODUCTS[0], quantity: 1, price: 24999, selectedColor: 'Midnight Black' },
    ],
    address: MOCK_ADDRESSES[0],
    paymentMethod: MOCK_PAYMENT_METHODS[0],
    status: 'delivered',
    subtotal: 24999,
    tax: 4500,
    shipping: 0,
    discount: 0,
    total: 29499,
    trackingId: 'DELHVRY9823742',
    estimatedDelivery: '2024-11-20',
    createdAt: '2024-11-14T10:00:00Z',
    updatedAt: '2024-11-20T14:30:00Z',
  },
  {
    id: 'o2',
    orderNumber: 'SZ2024112345',
    items: [
      { product: MOCK_PRODUCTS[2], quantity: 1, price: 8995, selectedSize: '8', selectedColor: 'Black/White' },
      { product: MOCK_PRODUCTS[9], quantity: 2, price: 399 },
    ],
    address: MOCK_ADDRESSES[0],
    paymentMethod: MOCK_PAYMENT_METHODS[1],
    status: 'shipped',
    subtotal: 9793,
    tax: 1762,
    shipping: 0,
    discount: 0,
    total: 11555,
    trackingId: 'BLDART1245678',
    estimatedDelivery: '2024-12-01',
    createdAt: '2024-11-26T08:20:00Z',
    updatedAt: '2024-11-28T11:00:00Z',
  },
  {
    id: 'o3',
    orderNumber: 'SZ2024120042',
    items: [
      { product: MOCK_PRODUCTS[10], quantity: 1, price: 64999 },
    ],
    address: MOCK_ADDRESSES[1],
    paymentMethod: MOCK_PAYMENT_METHODS[0],
    status: 'processing',
    subtotal: 64999,
    tax: 11700,
    shipping: 0,
    discount: 5000,
    total: 71699,
    createdAt: '2024-12-01T14:00:00Z',
    updatedAt: '2024-12-01T14:00:00Z',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const getProductsByCategory = (categoryId: string): Product[] =>
  MOCK_PRODUCTS.filter(p => p.categoryId === categoryId);

export const getFeaturedProducts = (): Product[] =>
  MOCK_PRODUCTS.filter(p => p.isFeatured);

export const getTrendingProducts = (): Product[] =>
  MOCK_PRODUCTS.filter(p => p.badge === 'trending' || p.badge === 'hot');

export const getProductById = (id: string): Product | undefined =>
  MOCK_PRODUCTS.find(p => p.id === id);

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return MOCK_PRODUCTS.filter(
    p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)),
  );
};
