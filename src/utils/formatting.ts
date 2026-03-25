export const formatPrice = (price: number, currency = '₹'): string => {
  if (price >= 100000) {
    return `${currency}${(price / 100000).toFixed(1)}L`;
  }
  if (price >= 1000) {
    return `${currency}${price.toLocaleString('en-IN')}`;
  }
  return `${currency}${price}`;
};

export const formatDiscount = (original: number, current: number): number => {
  return Math.round(((original - current) / original) * 100);
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatReviewCount = (count: number): string => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const formatOrderStatus = (status: string): string => {
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};

export const truncateText = (text: string, maxLen: number): string => {
  if (text.length <= maxLen) return text;
  return `${text.substring(0, maxLen).trim()}...`;
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};
