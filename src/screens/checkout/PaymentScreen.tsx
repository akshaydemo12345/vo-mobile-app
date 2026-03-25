import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useAppDispatch } from '../../redux/hooks';
import { setCheckoutPayment } from '../../redux/slices/orderSlice';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { MOCK_PAYMENT_METHODS } from '../../services/mock';
import type { AppStackScreenProps } from '../../navigation/types';

export default function PaymentScreen({ navigation }: AppStackScreenProps<'Payment'>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState(MOCK_PAYMENT_METHODS[0]?.id);

  const handleContinue = () => {
    const selected = MOCK_PAYMENT_METHODS.find(p => p.id === selectedId);
    if (selected) {
      dispatch(setCheckoutPayment(selected));
      navigation.navigate('OrderSummary', { orderId: 'pending' });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Payment Method</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        <View style={styles.methodsList}>
          <FlatList
            data={MOCK_PAYMENT_METHODS}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedId(item.id)}
                style={[
                  styles.methodCard,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor:
                      selectedId === item.id ? theme.colors.primary : theme.colors.border,
                    borderWidth: selectedId === item.id ? 2 : 1,
                  },
                ]}
              >
                <View style={styles.methodHeader}>
                  <View
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor:
                          selectedId === item.id ? theme.colors.primary : 'transparent',
                        borderColor: theme.colors.border,
                      },
                    ]}
                  >
                    {selectedId === item.id && (
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    )}
                  </View>
                  <Ionicons
                    name={item.type === 'card' ? 'card' : 'phone-portrait'}
                    size={20}
                    color={theme.colors.primary}
                    style={{ marginLeft: 8 }}
                  />
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={[styles.methodName, { color: theme.colors.text }]}>
                      {item.label}
                    </Text>
                    {item.last4 && (
                      <Text style={[styles.methodDetail, { color: theme.colors.textSecondary }]}>
                        •••• {item.last4}
                      </Text>
                    )}
                    {item.upiId && (
                      <Text style={[styles.methodDetail, { color: theme.colors.textSecondary }]}>
                        {item.upiId}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.surfaceElevated }]}
        >
          <Ionicons name="add-circle-outline" size={24} color={theme.colors.primary} />
          <Text style={[styles.addButtonText, { color: theme.colors.primary }]}>
            Add New Payment Method
          </Text>
        </TouchableOpacity>

        <View style={[styles.securityNotice, { backgroundColor: `${theme.colors.success}20` }]}>
          <Ionicons name="shield-checkmark" size={20} color={theme.colors.success} />
          <Text style={[styles.securityText, { color: theme.colors.success }]}>
            Your payments are secure and encrypted
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <Button label="Continue" onPress={handleContinue} fullWidth size="lg" />
      </View>
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
  title: { fontSize: 18, fontWeight: '700' },
  methodsList: { paddingHorizontal: 16, paddingVertical: 16 },
  methodCard: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodName: { fontSize: 14, fontWeight: '600' },
  methodDetail: { fontSize: 12, marginTop: 2 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  addButtonText: { fontSize: 14, fontWeight: '600', marginLeft: 8 },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  securityText: { fontSize: 12, marginLeft: 8, flex: 1 },
  footer: { paddingHorizontal: 16, paddingVertical: 16, borderTopWidth: 1 },
});
