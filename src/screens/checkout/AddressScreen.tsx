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
import { setCheckoutAddress } from '../../redux/slices/orderSlice';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { MOCK_ADDRESSES } from '../../services/mock';
import type { AppStackScreenProps } from '../../navigation/types';

export default function AddressScreen({ navigation }: AppStackScreenProps<'Address'>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState(MOCK_ADDRESSES[0]?.id);

  const handleContinue = () => {
    const selected = MOCK_ADDRESSES.find(a => a.id === selectedId);
    if (selected) {
      dispatch(setCheckoutAddress(selected));
      navigation.navigate('Payment');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Shipping Address</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        <View style={styles.addressList}>
          <FlatList
            data={MOCK_ADDRESSES}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedId(item.id)}
                style={[
                  styles.addressCard,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor:
                      selectedId === item.id ? theme.colors.primary : theme.colors.border,
                    borderWidth: selectedId === item.id ? 2 : 1,
                  },
                ]}
              >
                <View style={styles.addressHeader}>
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
                  <Text style={[styles.label, { color: theme.colors.primary }]}>
                    {item.label}
                  </Text>
                  {item.isDefault && (
                    <View style={[styles.defaultBadge, { backgroundColor: theme.colors.success }]}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>

                <View style={styles.addressDetails}>
                  <Text style={[styles.name, { color: theme.colors.text }]}>
                    {item.fullName}
                  </Text>
                  <Text style={[styles.address, { color: theme.colors.textSecondary }]}>
                    {item.line1}
                  </Text>
                  {item.line2 && (
                    <Text style={[styles.address, { color: theme.colors.textSecondary }]}>
                      {item.line2}
                    </Text>
                  )}
                  <Text style={[styles.address, { color: theme.colors.textSecondary }]}>
                    {item.city}, {item.state} {item.pincode}
                  </Text>
                  <Text style={[styles.phone, { color: theme.colors.textSecondary }]}>
                    +91 {item.phone}
                  </Text>
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
            Add New Address
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <Button
          label="Continue to Payment"
          onPress={handleContinue}
          fullWidth
          size="lg"
        />
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
  addressList: { paddingHorizontal: 16, paddingVertical: 16 },
  addressCard: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
  },
  addressHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { fontSize: 14, fontWeight: '600', flex: 1 },
  defaultBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  defaultText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  addressDetails: { marginLeft: 28 },
  name: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  address: { fontSize: 12, marginBottom: 2 },
  phone: { fontSize: 12, marginTop: 4 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  addButtonText: { fontSize: 14, fontWeight: '600', marginLeft: 8 },
  footer: { paddingHorizontal: 16, paddingVertical: 16, borderTopWidth: 1 },
});
