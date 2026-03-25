import React, { useEffect } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';

interface SkeletonBoxProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ width = '100%', height = 16, borderRadius = 6, style }) => {
  const { colors } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.shimmer1, colors.shimmer2],
    ),
  }));

  return (
    <Animated.View
      style={[
        { width: width as any, height, borderRadius },
        animatedStyle,
        style,
      ]}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.borderSubtle,
      }}
    >
      <SkeletonBox height={180} borderRadius={0} />
      <View style={{ padding: spacing[3] }}>
        <SkeletonBox height={14} width="90%" style={{ marginBottom: 8 }} />
        <SkeletonBox height={12} width="60%" style={{ marginBottom: 12 }} />
        <SkeletonBox height={20} width="50%" />
      </View>
    </View>
  );
};

export const BannerSkeleton: React.FC = () => {
  return <SkeletonBox height={200} borderRadius={14} />;
};

export const OrderCardSkeleton: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing[4],
        borderWidth: 1,
        borderColor: colors.borderSubtle,
        marginBottom: spacing[3],
      }}
    >
      <View style={[styles.row, { marginBottom: 12 }]}>
        <SkeletonBox width={80} height={12} />
        <SkeletonBox width={60} height={20} borderRadius={10} />
      </View>
      <View style={styles.row}>
        <SkeletonBox width={70} height={70} borderRadius={8} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <SkeletonBox height={14} width="80%" style={{ marginBottom: 8 }} />
          <SkeletonBox height={12} width="50%" style={{ marginBottom: 8 }} />
          <SkeletonBox height={16} width="40%" />
        </View>
      </View>
    </View>
  );
};

export default SkeletonBox;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
