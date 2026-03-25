import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/models';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const MOCK_USER: User = {
  id: 'u1',
  name: 'Rahul Verma',
  email: 'rahul@example.com',
  phone: '9876543210',
  avatar: 'https://i.pravatar.cc/150?img=33',
  createdAt: '2024-01-15T10:00:00Z',
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1200));
      if (credentials.email && credentials.password.length >= 6) {
        return { ...MOCK_USER, email: credentials.email };
      }
      return rejectWithValue('Invalid email or password');
    } catch {
      return rejectWithValue('Login failed. Please try again.');
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (
    data: { name: string; email: string; phone: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      await new Promise(res => setTimeout(res, 1200));
      return { ...MOCK_USER, name: data.name, email: data.email, phone: data.phone };
    } catch {
      return rejectWithValue('Registration failed. Please try again.');
    }
  },
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (_otp: string, { rejectWithValue }) => {
    try {
      await new Promise(res => setTimeout(res, 1000));
      return MOCK_USER;
    } catch {
      return rejectWithValue('Invalid OTP. Please try again.');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Signup
    builder
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // OTP
    builder
      .addCase(verifyOTP.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
