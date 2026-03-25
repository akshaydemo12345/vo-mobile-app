import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

interface StarRatingProps {
  rating: number;
  size?: number;
  showCount?: boolean;
  count?: number;
  compact?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 12,
  showCount = false,
  count,
  compact = false,
}) => {
  const { colors, fontSize } = useTheme();
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  if (compact) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
        <Ionicons name="star" size={size} color={colors.warning} />
        <Text style={{ fontSize: fontSize.xs, color: colors.textSecondary, fontWeight: '600' }}>
          {rating.toFixed(1)}
        </Text>
        {showCount && count !== undefined && (
          <Text style={{ fontSize: fontSize.xs, color: colors.textMuted }}>
            ({count.toLocaleString()})
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'star-outline';
        if (i < fullStars) iconName = 'star';
        else if (i === fullStars && hasHalf) iconName = 'star-half';
        return (
          <Ionicons
            key={i}
            name={iconName}
            size={size}
            color={i < fullStars || (i === fullStars && hasHalf) ? colors.warning : colors.border}
          />
        );
      })}
      {showCount && count !== undefined && (
        <Text style={{ fontSize: fontSize.xs, color: colors.textMuted, marginLeft: 4 }}>
          ({count.toLocaleString()})
        </Text>
      )}
    </View>
  );
};

export default StarRating;
