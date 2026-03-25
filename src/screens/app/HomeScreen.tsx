import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchProducts,
  fetchFeaturedProducts,
  fetchTrendingProducts,
} from '../../redux/slices/productSlice';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice, formatDiscount } from '../../utils/formatting';
import type { MainTabsScreenProps } from '../../navigation/types';
import type { Product } from '../../types/models';

export default function HomeScreen({ navigation }: MainTabsScreenProps<'Home'>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { featured, trending, loading } = useAppSelector(state => state.products);
  const cartCount = useAppSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchTrendingProducts());
  }, [dispatch]);

  const renderProductCard = (product: Product) => (
    <TouchableOpacity
      key={product.id}
      onPress={() =>
        navigation.navigate('ProductDetails', { productId: product.id })
      }
      style={[
        styles.productCard,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0]?.url || 'https://via.placeholder.com/150' }}
          style={styles.productImage}
        />
        {product.discount && (
          <View style={[styles.discountBadge, { backgroundColor: theme.colors.error }]}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
      </View>

      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, { color: theme.colors.text }]} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFA500" />
          <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
            {product.rating} ({product.reviewCount})
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: theme.colors.primary }]}>
            {formatPrice(product.price)}
          </Text>
          {product.originalPrice && (
            <Text style={[styles.originalPrice, { color: theme.colors.textTertiary }]}>
              {formatPrice(product.originalPrice)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
              Welcome to
            </Text>
            <Text style={[styles.appName, { color: theme.colors.primary }]}>ShopZen</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={[styles.cartButton, { backgroundColor: theme.colors.surfaceElevated }]}
          >
            <Ionicons name="cart" size={24} color={theme.colors.primary} />
            {cartCount > 0 && (
              <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={[
            styles.searchBar,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.searchPlaceholder, { color: theme.colors.textTertiary }]}>
            Search products...
          </Text>
        </TouchableOpacity>

        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Featured Products
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>See All →</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <FlatList
              data={featured.slice(0, 2)}
              renderItem={({ item }) => renderProductCard(item)}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* Trending Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Trending Now
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>See All →</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <FlatList
              data={trending.slice(0, 4)}
              renderItem={({ item }) => renderProductCard(item)}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  greeting: {
    fontSize: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchPlaceholder: {
    marginLeft: 8,
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  productCard: {
    flex: 0.48,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  productInfo: {
    padding: 8,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 10,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
  },
  originalPrice: {
    fontSize: 10,
    marginLeft: 6,
    textDecorationLine: 'line-through',
  },
});
