import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { formatPrice } from '../../utils/formatting';
import type { MainTabsScreenProps } from '../../navigation/types';

export default function WishlistScreen({ navigation }: MainTabsScreenProps<'Wishlist'>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(state => state.wishlist.items);

  const handleRemove = (productId: string) => {
    const product = wishlistItems.find(p => p.id === productId);
    if (product) {
      dispatch(toggleWishlist(product));
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>My Wishlist</Text>
        </View>

        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color={theme.colors.textTertiary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            Wishlist Empty
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
            Add items to your wishlist
          </Text>
          <Button
            label="Start Shopping"
            onPress={() => navigation.navigate('Home')}
            size="lg"
            style={{ marginTop: 24 }}
            fullWidth
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>My Wishlist</Text>
        <Text style={[styles.count, { color: theme.colors.textSecondary }]}>
          {wishlistItems.length} items
        </Text>
      </View>

      <FlatList
        data={wishlistItems}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <Image
              source={{ uri: item.images[0]?.url || 'https://via.placeholder.com/100' }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={[styles.price, { color: theme.colors.primary }]}>
                {formatPrice(item.price)}
              </Text>
              <Button
                label="Add to Cart"
                onPress={() => navigation.navigate('Cart')}
                size="sm"
                style={{ marginTop: 8 }}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleRemove(item.id)}
              style={styles.removeButton}
            >
              <Ionicons name="close-circle" size={24} color={theme.colors.error} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        scrollEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  count: { fontSize: 12, marginTop: 4 },
  list: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  item: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 14, fontWeight: '700' },
  removeButton: { padding: 8 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  emptySubtitle: { fontSize: 14 },
});
