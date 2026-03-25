import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../types/navigation';
import AppTabNavigator from './AppTabNavigator';
import ProductListScreen from '../screens/product/ProductListScreen';
import ProductDetailsScreen from '../screens/product/ProductDetailsScreen';
import CheckoutScreen from '../screens/checkout/CheckoutScreen';
import AddressSelectionScreen from '../screens/checkout/AddressSelectionScreen';
import AddAddressScreen from '../screens/checkout/AddAddressScreen';
import PaymentSelectionScreen from '../screens/checkout/PaymentSelectionScreen';
import OrderSummaryScreen from '../screens/checkout/OrderSummaryScreen';
import OrderConfirmationScreen from '../screens/checkout/OrderConfirmationScreen';
import OrdersListScreen from '../screens/orders/OrdersListScreen';
import OrderTrackingScreen from '../screens/orders/OrderTrackingScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppTabs" component={AppTabNavigator} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="AddressSelection" component={AddressSelectionScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="PaymentSelection" component={PaymentSelectionScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="OrdersList" component={OrdersListScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
