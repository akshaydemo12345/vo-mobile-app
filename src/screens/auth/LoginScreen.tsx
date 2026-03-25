import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginUser, clearError } from '../../redux/slices/authSlice';
import { loginSchema } from '../../utils/validation';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useToast } from '../../components/common/ToastProvider';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const { colors, spacing, fontSize, fontWeight, radius } = useTheme();
  const navigation = useNavigation<NavProp>();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const { loading, error } = useAppSelector(s => s.auth);

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
      dispatch(clearError());
    }
  }, [error, showToast, dispatch]);

  const handleLogin = async (values: { email: string; password: string }) => {
    dispatch(loginUser(values));
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + spacing[8], paddingBottom: insets.bottom + spacing[6] },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandRow}>
          <View
            style={[
              styles.logoBox,
              { backgroundColor: colors.primary, borderRadius: radius.lg },
            ]}
          >
            <Ionicons name="bag" size={28} color={colors.white} />
          </View>
          <Text
            style={{
              fontSize: fontSize['3xl'],
              fontWeight: fontWeight.extrabold,
              color: colors.text,
              marginTop: spacing[4],
            }}
          >
            ShopZen
          </Text>
          <Text
            style={{
              fontSize: fontSize.base,
              color: colors.textSecondary,
              marginTop: spacing[1],
              marginBottom: spacing[8],
            }}
          >
            Your premium shopping destination
          </Text>
        </View>

        <View style={{ paddingHorizontal: spacing[6] }}>
          <Text
            style={{
              fontSize: fontSize['2xl'],
              fontWeight: fontWeight.bold,
              color: colors.text,
              marginBottom: spacing[1],
            }}
          >
            Welcome back
          </Text>
          <Text
            style={{
              fontSize: fontSize.base,
              color: colors.textSecondary,
              marginBottom: spacing[6],
            }}
          >
            Sign in to continue shopping
          </Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <Input
                  label="Email address"
                  placeholder="you@example.com"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email ? errors.email : undefined}
                  leftIcon="mail-outline"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password ? errors.password : undefined}
                  leftIcon="lock-closed-outline"
                  isPassword
                />

                <TouchableOpacity
                  style={{ alignSelf: 'flex-end', marginBottom: spacing[5], marginTop: -4 }}
                >
                  <Text style={{ fontSize: fontSize.sm, color: colors.primary, fontWeight: fontWeight.medium }}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>

                <Button
                  label="Sign In"
                  onPress={() => handleSubmit()}
                  loading={loading}
                  fullWidth
                  size="lg"
                />
              </View>
            )}
          </Formik>

          <View style={[styles.divider, { marginVertical: spacing[6] }]}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, marginHorizontal: spacing[3] }}>
              or continue with
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <View style={[styles.socialRow, { gap: spacing[3] }]}>
            {(['Google', 'Apple'] as const).map(provider => (
              <TouchableOpacity
                key={provider}
                style={[
                  styles.socialBtn,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderRadius: radius.md,
                    flex: 1,
                    paddingVertical: spacing[3],
                  },
                ]}
              >
                <Ionicons
                  name={provider === 'Google' ? 'logo-google' : 'logo-apple'}
                  size={20}
                  color={colors.text}
                />
                <Text style={{ color: colors.text, fontSize: fontSize.sm, fontWeight: fontWeight.medium, marginLeft: 8 }}>
                  {provider}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.signupRow, { marginTop: spacing[8] }]}>
            <Text style={{ color: colors.textSecondary, fontSize: fontSize.base }}>
              {"Don't have an account? "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ color: colors.primary, fontSize: fontSize.base, fontWeight: fontWeight.semibold }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { flexGrow: 1 },
  brandRow: { alignItems: 'center', paddingHorizontal: 24 },
  logoBox: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  divider: { flexDirection: 'row', alignItems: 'center' },
  dividerLine: { flex: 1, height: 1 },
  socialRow: { flexDirection: 'row' },
  socialBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  signupRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
