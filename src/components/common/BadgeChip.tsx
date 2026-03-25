import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

type BadgeType = 'trending' | 'new' | 'sale' | 'hot' | 'bestseller';

interface BadgeChipProps {
  type: BadgeType;
  size?: 'sm' | 'md';
}

const BADGE_CONFIG: Record<BadgeType, { label: string; bg: string; text: string }> = {
  trending: { label: 'Trending', bg: 'rgba(108,99,255,0.2)', text: '#8B84FF' },
  new: { label: 'New', bg: 'rgba(34,197,94,0.2)', text: '#22C55E' },
  sale: { label: 'Sale', bg: 'rgba(255,107,107,0.2)', text: '#FF6B6B' },
  hot: { label: 'Hot', bg: 'rgba(245,158,11,0.2)', text: '#F59E0B' },
  bestseller: { label: 'Bestseller', bg: 'rgba(59,130,246,0.2)', text: '#3B82F6' },
};

const BadgeChip: React.FC<BadgeChipProps> = ({ type, size = 'sm' }) => {
  const { fontSize, radius } = useTheme();
  const config = BADGE_CONFIG[type];

  return (
    <View
      style={{
        backgroundColor: config.bg,
        borderRadius: radius.full,
        paddingHorizontal: size === 'sm' ? 6 : 10,
        paddingVertical: size === 'sm' ? 2 : 4,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          color: config.text,
          fontSize: size === 'sm' ? fontSize.xs : fontSize.sm,
          fontWeight: '700',
          letterSpacing: 0.3,
        }}
      >
        {config.label.toUpperCase()}
      </Text>
    </View>
  );
};

export default BadgeChip;
