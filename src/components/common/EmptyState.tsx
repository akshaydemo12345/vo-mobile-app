import React from 'react';
import { View, Text, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import Button from './Button';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  style,
}) => {
  const { colors, spacing, fontSize, fontWeight } = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: spacing[8],
          paddingVertical: spacing[12],
        },
        style,
      ]}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: colors.primaryMuted,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: spacing[5],
        }}
      >
        <Ionicons name={icon} size={36} color={colors.primary} />
      </View>
      <Text
        style={{
          fontSize: fontSize.xl,
          fontWeight: fontWeight.bold,
          color: colors.text,
          textAlign: 'center',
          marginBottom: spacing[2],
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontSize: fontSize.base,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 22,
            marginBottom: spacing[6],
          }}
        >
          {subtitle}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} variant="primary" />
      )}
    </View>
  );
};

export default EmptyState;
