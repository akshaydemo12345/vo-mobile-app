import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Order, Address, PaymentMethod } from '../../types/models';
import { MOCK_ORDERS } from '../../services/mock';

interface CheckoutState {
  selectedAddress: Address | null;
  selectedPayment: PaymentMethod | null;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  placingOrder: boolean;
  checkout: CheckoutState;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  placingOrder: false,
  checkout: {
    selectedAddress: null,
    selectedPayment: null,
  },
};

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  await new Promise(res => setTimeout(res, 600));
  return MOCK_ORDERS;
});

export const placeOrder = createAsyncThunk(
  'orders/place',
  async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      await new Promise(res => setTimeout(res, 1500));
      const newOrder: Order = {
        ...orderData,
        id: `o${Date.now()}`,
        orderNumber: `SZ${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newOrder;
    } catch {
      return rejectWithValue('Failed to place order. Please try again.');
    }
  },
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCheckoutAddress(state, action: PayloadAction<Address>) {
      state.checkout.selectedAddress = action.payload;
    },
    setCheckoutPayment(state, action: PayloadAction<PaymentMethod>) {
      state.checkout.selectedPayment = action.payload;
    },
    clearCheckout(state) {
      state.checkout = { selectedAddress: null, selectedPayment: null };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(fetchOrders.rejected, state => { state.loading = false; state.error = 'Failed to load orders'; });

    builder
      .addCase(placeOrder.pending, state => { state.placingOrder = true; })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placingOrder = false;
        state.orders.unshift(action.payload);
        state.checkout = { selectedAddress: null, selectedPayment: null };
      })
      .addCase(placeOrder.rejected, state => { state.placingOrder = false; });
  },
});

export const { setCheckoutAddress, setCheckoutPayment, clearCheckout } = orderSlice.actions;
export default orderSlice.reducer;
