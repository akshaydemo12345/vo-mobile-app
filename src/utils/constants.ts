import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export { SCREEN_WIDTH, SCREEN_HEIGHT };

export const TAX_RATE = 0.18; // 18% GST
export const FREE_SHIPPING_THRESHOLD = 499;
export const SHIPPING_CHARGE = 49;

export const COUPON_CODES: Record<string, { type: 'percent' | 'flat'; value: number; minOrder?: number }> = {
  SAVE10: { type: 'percent', value: 10 },
  SAVE20: { type: 'percent', value: 20, minOrder: 999 },
  FLAT100: { type: 'flat', value: 100, minOrder: 499 },
  WELCOME50: { type: 'flat', value: 50 },
};

export const ORDER_STATUS_STEPS: Record<string, number> = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  out_for_delivery: 4,
  delivered: 5,
};

export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x300/1A1A24/6C63FF?text=ShopZen';

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;
