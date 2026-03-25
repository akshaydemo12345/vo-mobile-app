import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  OTP: { email: string; phone?: string };
};

// App Tab
export type AppTabParamList = {
  Home: undefined;
  Search: { query?: string; categoryId?: string } | undefined;
  Cart: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

// App Stack (wraps tab + screens accessible from tabs)
export type AppStackParamList = {
  AppTabs: undefined;
  ProductList: { categoryId?: string; categoryName?: string; searchQuery?: string };
  ProductDetails: { productId: string };
  Checkout: undefined;
  AddressSelection: undefined;
  AddAddress: { editId?: string };
  PaymentSelection: undefined;
  OrderSummary: undefined;
  OrderConfirmation: { orderId: string };
  OrdersList: undefined;
  OrderTracking: { orderId: string };
  EditProfile: undefined;
};

// Root Navigator
export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

// Composed navigation types
export type HomeScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, 'Home'>,
  NativeStackNavigationProp<AppStackParamList>
>;

export type SearchScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, 'Search'>,
  NativeStackNavigationProp<AppStackParamList>
>;

export type CartScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, 'Cart'>,
  NativeStackNavigationProp<AppStackParamList>
>;

export type ProductListNavProp = NativeStackNavigationProp<AppStackParamList, 'ProductList'>;
export type ProductDetailsNavProp = NativeStackNavigationProp<AppStackParamList, 'ProductDetails'>;

// Route prop types
export type ProductListRouteProp = RouteProp<AppStackParamList, 'ProductList'>;
export type ProductDetailsRouteProp = RouteProp<AppStackParamList, 'ProductDetails'>;
export type OTPRouteProp = RouteProp<AuthStackParamList, 'OTP'>;
export type OrderTrackingRouteProp = RouteProp<AppStackParamList, 'OrderTracking'>;
export type OrderConfirmationRouteProp = RouteProp<AppStackParamList, 'OrderConfirmation'>;
