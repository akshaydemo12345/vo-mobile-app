import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductById } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import Button from '../../components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice, formatDiscount } from '../../utils/formatting';
import type { AppStackScreenProps } from '../../navigation/types';

export default function ProductDetailsScreen({
  route,
  navigation,
}: AppStackScreenProps<'ProductDetails'>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading } = useAppSelector(state => state.products);
  const wishlisted = useAppSelector(state =>
    state.wishlist.items.some(p => p.id === route.params.productId)
  );

  useEffect(() => {
    dispatch(fetchProductById(route.params.productId));
  }, [dispatch, route.params.productId]);

  if (loading || !selectedProduct) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product: selectedProduct, quantity: 1 }));
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(selectedProduct));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Product Details
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedProduct.images[0]?.url }}
            style={styles.mainImage}
          />
          {selectedProduct.discount && (
            <View style={[styles.discountBadge, { backgroundColor: theme.colors.error }]}>
              <Text style={styles.discountText}>-{selectedProduct.discount}%</Text>
            </View>
          )}
        </View>

        <View style={[styles.content, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {selectedProduct.title}
          </Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFA500" />
            <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
              {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: theme.colors.primary }]}>
              {formatPrice(selectedProduct.price)}
            </Text>
            {selectedProduct.originalPrice && (
              <Text style={[styles.originalPrice, { color: theme.colors.textTertiary }]}>
                {formatPrice(selectedProduct.originalPrice)}
              </Text>
            )}
          </View>

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Description
          </Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            {selectedProduct.description}
          </Text>

          <View style={styles.actions}>
            <Button
              label="Add to Cart"
              onPress={handleAddToCart}
              size="lg"
              fullWidth
              style={{ marginRight: 8, flex: 1 }}
            />
            <TouchableOpacity
              onPress={handleWishlist}
              style={[
                styles.wishlistButton,
                {
                  backgroundColor: wishlisted ? theme.colors.error : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Ionicons
                name={wishlisted ? 'heart' : 'heart-outline'}
                size={24}
                color={wishlisted ? '#fff' : theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  imageContainer: { position: 'relative', backgroundColor: '#f0f0f0', minHeight: 300 },
  mainImage: { width: '100%', height: 300 },
  discountBadge: { position: 'absolute', top: 12, right: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  discountText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  rating: { fontSize: 12, marginLeft: 4 },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  price: { fontSize: 24, fontWeight: '700' },
  originalPrice: { fontSize: 14, marginLeft: 8, textDecorationLine: 'line-through' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 12, marginBottom: 8 },
  description: { fontSize: 14, lineHeight: 20 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 24 },
  wishlistButton: { width: 48, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
});
