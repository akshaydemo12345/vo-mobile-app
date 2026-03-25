import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { AppTabParamList } from '../types/navigation';
import { useTheme } from '../theme/ThemeContext';
import { useAppSelector } from '../redux/hooks';
import { selectCartItemCount } from '../redux/slices/cartSlice';

// Screens (lazy import to keep tabs quick)
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import CartScreen from '../screens/cart/CartScreen';
import WishlistScreen from '../screens/wishlist/WishlistScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

type TabConfig = {
  name: keyof AppTabParamList;
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
  label: string;
};

const TABS: TabConfig[] = [
  { name: 'Home', icon: 'home', iconOutline: 'home-outline', label: 'Home' },
  { name: 'Search', icon: 'search', iconOutline: 'search-outline', label: 'Search' },
  { name: 'Cart', icon: 'bag', iconOutline: 'bag-outline', label: 'Cart' },
  { name: 'Wishlist', icon: 'heart', iconOutline: 'heart-outline', label: 'Wishlist' },
  { name: 'Profile', icon: 'person', iconOutline: 'person-outline', label: 'Profile' },
];

function CustomTabBar({ state, descriptors, navigation }: any) {
  const { colors, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const cartCount = useAppSelector(selectCartItemCount);

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: Math.max(insets.bottom, spacing[2]),
          paddingTop: spacing[2],
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const tab = TABS[index];
        const isFocused = state.index === index;
        const isCart = tab.name === 'Cart';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isFocused }}
          >
            <View style={styles.iconContainer}>
              {isFocused && (
                <View
                  style={[
                    styles.activeIndicator,
                    { backgroundColor: colors.primaryMuted, borderRadius: radius.full },
                  ]}
                />
              )}
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={isFocused ? tab.icon : tab.iconOutline}
                  size={22}
                  color={isFocused ? colors.primary : colors.textMuted}
                />
                {isCart && cartCount > 0 && (
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: colors.accent },
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {cartCount > 9 ? '9+' : cartCount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <Text
              style={{
                fontSize: 10,
                color: isFocused ? colors.primary : colors.textMuted,
                fontWeight: isFocused ? '600' : '400',
                marginTop: 2,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const AppTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 48,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    width: 48,
    height: 32,
  },
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
});

export default AppTabNavigator;
