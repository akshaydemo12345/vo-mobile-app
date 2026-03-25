import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  padding?: number;
}

const Card: React.FC<CardProps> = ({ children, style, elevated = false, padding }) => {
  const { colors, radius, shadow, spacing } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: elevated ? colors.surfaceElevated : colors.surface,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.borderSubtle,
          padding: padding !== undefined ? padding : spacing[4],
          ...(elevated ? shadow.md : shadow.sm),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({ card: { overflow: 'hidden' } });

export default Card;
