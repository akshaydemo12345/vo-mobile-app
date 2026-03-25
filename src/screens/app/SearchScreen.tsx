import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFilters } from '../../redux/slices/productSlice';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import type { MainTabsScreenProps } from '../../navigation/types';

export default function SearchScreen({ navigation }: MainTabsScreenProps<'Search'>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(setFilters({ search: searchQuery }));
      navigation.navigate('Cart');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <View style={styles.header}>
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search products..."
            placeholderTextColor={theme.colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          style={[styles.filterButton, { backgroundColor: theme.colors.primary }]}
        >
          <Ionicons name="funnel" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={[styles.filterPanel, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.filterTitle, { color: theme.colors.text }]}>Filters</Text>
          <View style={styles.filterContent}>
            <Text style={[styles.filterLabel, { color: theme.colors.textSecondary }]}>
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </Text>
            <Button
              label="Apply Filters"
              onPress={() => {
                setShowFilters(false);
              }}
              size="md"
              fullWidth
            />
          </View>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={64} color={theme.colors.textTertiary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            Search Products
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
            Enter a product name to search
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    paddingVertical: 10,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPanel: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 12,
    borderRadius: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  filterContent: {
    gap: 12,
  },
  filterLabel: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
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
});
