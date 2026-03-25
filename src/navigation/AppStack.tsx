import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParamList } from './types';
import MainTabs from './MainTabs';
import ProductDetailsScreen from '../screens/app/ProductDetailsScreen';
import SearchResultsScreen from '../screens/app/SearchResultsScreen';
import CategoryProductsScreen from '../screens/app/CategoryProductsScreen';
import OrderTrackingScreen from '../screens/app/OrderTrackingScreen';
import AddressScreen from '../screens/checkout/AddressScreen';
import PaymentScreen from '../screens/checkout/PaymentScreen';
import OrderSummaryScreen from '../screens/checkout/OrderSummaryScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: 'Product Details',
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ title: 'Search Results' }}
      />
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProductsScreen}
        options={({ route }) => ({
          title: route.params.categoryName,
        })}
      />
      <Stack.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
        options={{ title: 'Order Tracking' }}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{ title: 'Shipping Address' }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: 'Payment Method' }}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummaryScreen}
        options={{ title: 'Order Confirmation' }}
      />
    </Stack.Navigator>
  );
}
