import React, { useCallback } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { colors, spacing, radius, fontSize, fontWeight } = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isDisabled = disabled || loading;

  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: radius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Sizing
    switch (size) {
      case 'sm':
        base.paddingHorizontal = spacing[3];
        base.paddingVertical = spacing[2];
        break;
      case 'lg':
        base.paddingHorizontal = spacing[6];
        base.paddingVertical = spacing[4];
        break;
      default:
        base.paddingHorizontal = spacing[5];
        base.paddingVertical = spacing[3];
    }

    if (fullWidth) base.alignSelf = 'stretch';

    // Variant
    switch (variant) {
      case 'primary':
        base.backgroundColor = isDisabled ? colors.primaryMuted : colors.primary;
        break;
      case 'secondary':
        base.backgroundColor = colors.surfaceElevated;
        break;
      case 'outline':
        base.backgroundColor = 'transparent';
        base.borderWidth = 1.5;
        base.borderColor = colors.primary;
        break;
      case 'ghost':
        base.backgroundColor = 'transparent';
        break;
      case 'danger':
        base.backgroundColor = isDisabled ? 'rgba(239,68,68,0.3)' : colors.error;
        break;
    }

    return base;
  };

  const getTextStyle = (): TextStyle => {
    const base: TextStyle = {
      fontWeight: fontWeight.semibold,
    };
    switch (size) {
      case 'sm': base.fontSize = fontSize.sm; break;
      case 'lg': base.fontSize = fontSize.lg; break;
      default: base.fontSize = fontSize.base;
    }
    switch (variant) {
      case 'primary':
      case 'danger':
        base.color = colors.white;
        break;
      case 'outline':
        base.color = colors.primary;
        break;
      case 'ghost':
        base.color = colors.textSecondary;
        break;
      case 'secondary':
        base.color = colors.text;
        break;
    }
    if (isDisabled) base.opacity = 0.5;
    return base;
  };

  return (
    <AnimatedTouchable
      style={[animatedStyle, getContainerStyle(), style]}
      onPress={isDisabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.white}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[getTextStyle(), textStyle]}>{label}</Text>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </>
      )}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});

export default Button;
