import React, { useState, useRef, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      onRightIconPress,
      isPassword = false,
      containerStyle,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const { colors, spacing, radius, fontSize, fontWeight } = useTheme();
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const borderColor = useSharedValue(colors.border);

    const handleFocus = (e: any) => {
      setFocused(true);
      borderColor.value = withTiming(colors.primary, { duration: 200 });
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setFocused(false);
      borderColor.value = withTiming(error ? colors.error : colors.border, { duration: 200 });
      onBlur?.(e);
    };

    const animatedBorderStyle = useAnimatedStyle(() => ({
      borderColor: error ? colors.error : borderColor.value,
    }));

    const resolvedRightIcon = isPassword
      ? showPassword
        ? 'eye-off-outline'
        : 'eye-outline'
      : rightIcon;

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text
            style={{
              fontSize: fontSize.sm,
              fontWeight: fontWeight.medium,
              color: focused ? colors.primary : colors.textSecondary,
              marginBottom: spacing[1],
            }}
          >
            {label}
          </Text>
        )}
        <Animated.View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: colors.surface,
              borderRadius: radius.md,
              borderWidth: 1.5,
            },
            animatedBorderStyle,
          ]}
        >
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={18}
              color={focused ? colors.primary : colors.textMuted}
              style={styles.leftIcon}
            />
          )}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              {
                color: colors.text,
                fontSize: fontSize.base,
                flex: 1,
                paddingVertical: spacing[3],
                paddingLeft: leftIcon ? 0 : spacing[3],
                paddingRight: resolvedRightIcon ? 0 : spacing[3],
              },
            ]}
            placeholderTextColor={colors.textMuted}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={isPassword && !showPassword}
            {...rest}
          />
          {resolvedRightIcon && (
            <TouchableOpacity
              onPress={isPassword ? () => setShowPassword(v => !v) : onRightIconPress}
              style={styles.rightIcon}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityLabel={isPassword ? (showPassword ? 'Hide password' : 'Show password') : undefined}
            >
              <Ionicons name={resolvedRightIcon} size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </Animated.View>
        {error ? (
          <Text style={{ fontSize: fontSize.xs, color: colors.error, marginTop: 4 }}>
            {error}
          </Text>
        ) : hint ? (
          <Text style={{ fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4 }}>
            {hint}
          </Text>
        ) : null}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: { fontFamily: 'System' },
  leftIcon: { marginLeft: 12, marginRight: 8 },
  rightIcon: { paddingHorizontal: 12 },
});

export default Input;
