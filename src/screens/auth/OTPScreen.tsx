import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput as RNTextInput,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Button from '../../components/common/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { verifyOTP } from '../../redux/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import type { AuthStackScreenProps } from '../../navigation/types';

export default function OTPScreen({ route, navigation }: AuthStackScreenProps<'OTP'>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const phone = route.params?.phone || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(RNTextInput | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      return;
    }

    const result = await dispatch(verifyOTP(otpCode));
    if (verifyOTP.fulfilled.match(result)) {
      // Navigation happens automatically
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(120);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const isFilled = otp.every(digit => digit !== '');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={[styles.illustration, { backgroundColor: `${theme.colors.primary}20` }]}>
            <Ionicons name="shield-checkmark" size={48} color={theme.colors.primary} />
          </View>

          <Text style={[styles.title, { color: theme.colors.text }]}>
            Verify Your Phone
          </Text>

          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Enter the 6-digit code sent to {'\n'}
            <Text style={{ fontWeight: '600', color: theme.colors.text }}>
              +91 {phone.slice(-4)}
            </Text>
          </Text>
        </View>

        {error && (
          <View style={[styles.errorContainer, { backgroundColor: `${theme.colors.error}20` }]}>
            <Ionicons name="alert-circle" size={20} color={theme.colors.error} />
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {error}
            </Text>
          </View>
        )}

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <RNTextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                {
                  borderColor: digit
                    ? theme.colors.primary
                    : theme.colors.border,
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                },
              ]}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={value => {
                if (/^[0-9]*$/.test(value)) {
                  handleOtpChange(value, index);
                }
              }}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !digit) {
                  handleBackspace(index);
                }
              }}
              selectionColor={theme.colors.primary}
            />
          ))}
        </View>

        <View style={styles.timerContainer}>
          {!canResend ? (
            <Text style={[styles.timerText, { color: theme.colors.textSecondary }]}>
              Resend code in{' '}
              <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>
                {formatTime()}
              </Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={[styles.resendText, { color: theme.colors.primary }]}>
                Didn't receive code? Resend
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Button
          label="Verify OTP"
          onPress={handleVerify}
          loading={loading}
          disabled={loading || !isFilled}
          fullWidth
          size="lg"
          style={{ marginTop: 32 }}
        />

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.changeNumber}>
          <Text style={[styles.changeNumberText, { color: theme.colors.primary }]}>
            Change phone number
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    marginBottom: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  illustration: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  errorText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: '14%',
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 14,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '600',
  },
  changeNumber: {
    alignItems: 'center',
    marginTop: 20,
  },
  changeNumberText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
