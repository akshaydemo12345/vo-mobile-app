import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProducts, setFilters } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { formatPrice } from '../../utils/formatting';
import type { MainTabsScreenProps } from '../../navigation/types';

export default function ProductListScreen({ navigation }: MainTabsScreenProps<'Home'>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { items, loading, filters } = useAppSelector(state => state.products);
  const wishlistIds = useAppSelector(state => state.wishlist.items.map(p => p.id));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleAddToCart = (productId: string) => {
    const product = items.find(p => p.id === productId);
    if (product) {
      dispatch(addToCart({ product, quantity: 1 }));
    }
  };

  const handleWishlist = (productId: string) => {
    const product = items.find(p => p.id === productId);
    if (product) {
      dispatch(toggleWishlist(product));
    }
  };

  const renderProductCard = (productId: string) => {
    const product = items.find(p => p.id === productId);
    if (!product) return null;

    const isWishlisted = wishlistIds.includes(product.id);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images[0]?.url }}
            style={styles.image}
          />
          {product.discount && (
            <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
              <Text style={styles.badgeText}>-{product.discount}%</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => handleWishlist(product.id)}
            style={[
              styles.wishlistIcon,
              {
                backgroundColor: isWishlisted
                  ? theme.colors.error
                  : theme.colors.surface,
              },
            ]}
          >
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={18}
              color={isWishlisted ? '#fff' : theme.colors.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <Text
            style={[styles.name, { color: theme.colors.text }]}
            numberOfLines={2}
          >
            {product.title}
          </Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#FFA500" />
            <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
              {product.rating}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: theme.colors.primary }]}>
              {formatPrice(product.price)}
            </Text>
            {product.originalPrice && (
              <Text style={[styles.originalPrice, { color: theme.colors.textTertiary }]}>
                {formatPrice(product.originalPrice)}
              </Text>
            )}
          </View>

          <Button
            label="Add to Cart"
            onPress={() => handleAddToCart(product.id)}
            size="sm"
            fullWidth
            style={{ marginTop: 8 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Products
        </Text>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            style={[styles.viewButton, { backgroundColor: theme.colors.primary }]}
          >
            <Ionicons
              name={viewMode === 'grid' ? 'list' : 'grid'}
              size={16}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="search-outline"
            size={64}
            color={theme.colors.textTertiary}
          />
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            No products found
          </Text>
        </View>
      ) : (
        <FlatList
          data={items.map(p => p.id)}
          renderItem={({ item }) => renderProductCard(item)}
          keyExtractor={item => item}
          numColumns={viewMode === 'grid' ? 2 : 1}
          columnWrapperStyle={
            viewMode === 'grid' ? styles.columnWrapper : undefined
          }
          contentContainerStyle={styles.listContent}
          scrollEnabled
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: { fontSize: 24, fontWeight: '700' },
  controls: { flexDirection: 'row', gap: 8 },
  viewButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  columnWrapper: { justifyContent: 'space-between', gap: 12, marginBottom: 12 },
  card: {
    flex: 0.48,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
  },
  imageContainer: { position: 'relative', height: 140, backgroundColor: '#f0f0f0' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  wishlistIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { padding: 8 },
  name: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  rating: { fontSize: 10, marginLeft: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  price: { fontSize: 14, fontWeight: '700' },
  originalPrice: { fontSize: 10, marginLeft: 6, textDecorationLine: 'line-through' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, marginTop: 16 },
});
