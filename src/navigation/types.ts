import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
} from '@react-navigation/native';

export type RootStackParamList = {
  AuthStack: undefined;
  AppStack: undefined;
  Splash: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  OTP: { phone: string };
};

export type AppStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
  SearchResults: { query: string };
  CategoryProducts: { categoryId: string; categoryName: string };
  OrderTracking: { orderId: string };
  Address: undefined;
  Payment: undefined;
  OrderSummary: { orderId: string };
};

export type MainTabsParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

// Navigation Props
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

export type MainTabsScreenProps<T extends keyof MainTabsParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabsParamList, T>,
  NativeStackScreenProps<AppStackParamList>
>;
