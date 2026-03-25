import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { selectCartTotals } from '../../redux/slices/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { formatPrice } from '../../utils/formatting';
import type { MainTabsScreenProps } from '../../navigation/types';

export default function CartScreen({ navigation }: MainTabsScreenProps<'Cart'>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);
  const totals = useAppSelector(selectCartTotals);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color={theme.colors.textTertiary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            Your Cart is Empty
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
            Add items to get started
          </Text>
          <Button
            label="Continue Shopping"
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
        <Text style={[styles.title, { color: theme.colors.text }]}>Shopping Cart</Text>
        <Text style={[styles.itemCount, { color: theme.colors.textSecondary }]}>
          {items.length} items
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View
              style={[
                styles.cartItem,
                { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
              ]}
            >
              <Image
                source={{ uri: item.product.images[0]?.url || 'https://via.placeholder.com/100' }}
                style={styles.productImage}
              />

              <View style={styles.itemDetails}>
                <Text style={[styles.productName, { color: theme.colors.text }]} numberOfLines={2}>
                  {item.product.title}
                </Text>
                <Text style={[styles.productPrice, { color: theme.colors.primary }]}>
                  {formatPrice(item.product.price)}
                </Text>

                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                    style={[
                      styles.quantityButton,
                      { backgroundColor: theme.colors.surfaceElevated },
                    ]}
                  >
                    <Ionicons name="remove" size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                  <Text style={[styles.quantity, { color: theme.colors.text }]}>
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                    style={[
                      styles.quantityButton,
                      { backgroundColor: theme.colors.surfaceElevated },
                    ]}
                  >
                    <Ionicons name="add" size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => handleRemoveItem(item.id)}
                style={styles.removeButton}
              >
                <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.cartList}
        />
      </ScrollView>

      <View
        style={[
          styles.summary,
          { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border },
        ]}
      >
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Subtotal
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
            {formatPrice(totals.subtotal)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Tax</Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
            {formatPrice(totals.tax)}
          </Text>
        </View>

        {totals.shipping > 0 && (
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Shipping
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              {formatPrice(totals.shipping)}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.totalRow,
            { borderTopColor: theme.colors.border, borderTopWidth: 1 },
          ]}
        >
          <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total</Text>
          <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
            {formatPrice(totals.total)}
          </Text>
        </View>

        <Button
          label="Proceed to Checkout"
          onPress={() => navigation.navigate('Address')}
          size="lg"
          fullWidth
          style={{ marginTop: 12 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  itemCount: {
    fontSize: 12,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cartList: {
    paddingVertical: 12,
    gap: 12,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
  },
  summary: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
