import React, { useEffect, useCallback } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onHide: () => void;
}

const ICON_MAP: Record<ToastType, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'close-circle',
  info: 'information-circle',
  warning: 'warning',
};

const Toast: React.FC<ToastProps> = ({ message, type = 'success', duration = 2500, onHide }) => {
  const { colors, spacing, radius, fontSize } = useTheme();
  const translateY = useSharedValue(-80);
  const opacity = useSharedValue(0);

  const hide = useCallback(() => {
    'worklet';
    translateY.value = withTiming(-80, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 }, finished => {
      if (finished) runOnJS(onHide)();
    });
  }, [translateY, opacity, onHide]);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
    opacity.value = withTiming(1, { duration: 200 });
    const timer = setTimeout(() => {
      hide();
    }, duration);
    return () => clearTimeout(timer);
  }, [hide, duration, translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getColor = () => {
    switch (type) {
      case 'success': return colors.success;
      case 'error': return colors.error;
      case 'warning': return colors.warning;
      case 'info': return colors.info;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceElevated,
          borderRadius: radius.lg,
          borderLeftWidth: 4,
          borderLeftColor: getColor(),
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[3],
        },
        animatedStyle,
      ]}
    >
      <Ionicons name={ICON_MAP[type]} size={20} color={getColor()} />
      <Text
        style={{
          color: colors.text,
          fontSize: fontSize.sm,
          marginLeft: spacing[2],
          flex: 1,
          fontWeight: '500',
        }}
        numberOfLines={2}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 56,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
});

export default Toast;
