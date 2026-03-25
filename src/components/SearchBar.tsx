import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius, typography } from '../theme/colors';
import Icon from '@expo/vector-icons/MaterialIcons';

interface SearchBarProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
  value?: string;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products...',
  onChangeText,
  onSearch,
  onFilterPress,
  value = '',
  style,
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceLight,
          borderColor: isFocused ? colors.primary : colors.border,
        },
        style,
      ]}
    >
      <Icon
        name="search"
        size={20}
        color={isFocused ? colors.primary : colors.textSecondary}
        style={styles.icon}
      />

      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            ...typography.body,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={() => onSearch?.(value)}
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          style={styles.clearButton}
        >
          <Icon name="close" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      )}

      {onFilterPress && (
        <TouchableOpacity
          onPress={onFilterPress}
          style={styles.filterButton}
        >
          <Icon name="tune" size={20} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  clearButton: {
    padding: spacing.sm,
  },
  filterButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
});
