import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product, Coupon } from '../../types/models';
import { TAX_RATE, FREE_SHIPPING_THRESHOLD, SHIPPING_CHARGE, COUPON_CODES } from '../../utils/constants';

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  couponError: string | null;
}

const initialState: CartState = {
  items: [],
  coupon: null,
  couponError: null,
};

const generateCartItemId = (productId: string, size?: string, color?: string) =>
  [productId, size, color].filter(Boolean).join('_');

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ product: Product; quantity?: number; size?: string; color?: string }>,
    ) {
      const { product, quantity = 1, size, color } = action.payload;
      const itemId = generateCartItemId(product.id, size, color);
      const existing = state.items.find(i => i.id === itemId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id: itemId, product, quantity, selectedSize: size, selectedColor: color });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.coupon = null;
      state.couponError = null;
    },
    applyCoupon(state, action: PayloadAction<string>) {
      const code = action.payload.toUpperCase();
      const couponDef = COUPON_CODES[code];
      const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

      if (!couponDef) {
        state.couponError = 'Invalid coupon code';
        state.coupon = null;
        return;
      }
      if (couponDef.minOrder && subtotal < couponDef.minOrder) {
        state.couponError = `Minimum order of ₹${couponDef.minOrder} required`;
        state.coupon = null;
        return;
      }
      state.couponError = null;
      const discount =
        couponDef.type === 'percent'
          ? Math.round((subtotal * couponDef.value) / 100)
          : couponDef.value;
      state.coupon = { code, discount, type: couponDef.type };
    },
    removeCoupon(state) {
      state.coupon = null;
      state.couponError = null;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon } =
  cartSlice.actions;
export default cartSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

export const selectCartTotals = (state: { cart: CartState }) => {
  const subtotal = selectCartSubtotal(state);
  const discount = state.cart.coupon?.discount ?? 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const tax = Math.round(discountedSubtotal * TAX_RATE);
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const total = discountedSubtotal + tax + shipping;
  return { subtotal, discount, tax, shipping, total };
};

export const selectIsInCart = (productId: string) => (state: { cart: CartState }) =>
  state.cart.items.some(i => i.product.id === productId);
