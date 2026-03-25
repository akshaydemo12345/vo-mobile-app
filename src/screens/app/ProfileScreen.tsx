import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import type { MainTabsScreenProps } from '../../navigation/types';

export default function ProfileScreen({ navigation }: MainTabsScreenProps<'Profile'>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    { icon: 'receipt', label: 'My Orders', onPress: () => {} },
    { icon: 'location', label: 'Addresses', onPress: () => {} },
    { icon: 'card', label: 'Payment Methods', onPress: () => {} },
    { icon: 'settings', label: 'Settings', onPress: () => {} },
    { icon: 'help-circle', label: 'Help & Support', onPress: () => {} },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.colors.primary }]}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <Ionicons name="person" size={40} color="#fff" />
            )}
          </View>

          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {user?.name || 'User'}
            </Text>
            <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
              {user?.email}
            </Text>
            <Text style={[styles.userPhone, { color: theme.colors.textTertiary }]}>
              {user?.phone || 'N/A'}
            </Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>12</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Orders</Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>24</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Wishlist</Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>3</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Addresses
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={[
                styles.menuItem,
                { borderBottomColor: theme.colors.border, borderBottomWidth: index < menuItems.length - 1 ? 1 : 0 },
              ]}
            >
              <Ionicons name={item.icon as any} size={20} color={theme.colors.primary} />
              <Text style={[styles.menuLabel, { color: theme.colors.text }]}>
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.footer}>
          <Button
            label="Logout"
            onPress={handleLogout}
            variant="outline"
            size="lg"
            fullWidth
            icon={<Ionicons name="log-out" size={16} color={theme.colors.primary} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingVertical: 20, flexDirection: 'row', alignItems: 'center' },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  userEmail: { fontSize: 12, marginBottom: 4 },
  userPhone: { fontSize: 12 },
  editButton: { padding: 8 },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  statValue: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  statLabel: { fontSize: 12 },
  menuContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  menuLabel: { flex: 1, fontSize: 14 },
  footer: { paddingHorizontal: 16, paddingVertical: 20 },
});
