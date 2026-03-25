import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, Filters } from '../../types/models';
import {
  MOCK_PRODUCTS,
  getProductsByCategory,
  searchProducts,
} from '../../services/mock';

interface ProductState {
  items: Product[];
  featured: Product[];
  trending: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: Filters;
}

const initialState: ProductState = {
  items: [],
  featured: [],
  trending: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: { sortBy: 'relevance' },
};

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (filters?: Filters) => {
    await new Promise(res => setTimeout(res, 600));
    let results = [...MOCK_PRODUCTS];

    if (filters?.categoryId) {
      results = getProductsByCategory(filters.categoryId);
    }
    if (filters?.search) {
      results = searchProducts(filters.search);
    }
    if (filters?.minPrice !== undefined) {
      results = results.filter(p => p.price >= filters.minPrice!);
    }
    if (filters?.maxPrice !== undefined) {
      results = results.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters?.minRating !== undefined) {
      results = results.filter(p => p.rating >= filters.minRating!);
    }

    // Sorting
    switch (filters?.sortBy) {
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return results;
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: string, { rejectWithValue }) => {
    await new Promise(res => setTimeout(res, 400));
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) return rejectWithValue('Product not found');
    return product;
  },
);

export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeatured', async () => {
  await new Promise(res => setTimeout(res, 400));
  return MOCK_PRODUCTS.filter(p => p.isFeatured);
});

export const fetchTrendingProducts = createAsyncThunk('products/fetchTrending', async () => {
  await new Promise(res => setTimeout(res, 400));
  return MOCK_PRODUCTS.filter(p => p.badge === 'trending' || p.badge === 'hot');
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = { sortBy: 'relevance' };
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Failed to load products'; });

    builder
      .addCase(fetchProductById.pending, state => { state.loading = true; state.error = null; state.selectedProduct = null; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.selectedProduct = action.payload; })
      .addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

    builder
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => { state.featured = action.payload; });

    builder
      .addCase(fetchTrendingProducts.fulfilled, (state, action) => { state.trending = action.payload; });
  },
});

export const { setFilters, resetFilters, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
