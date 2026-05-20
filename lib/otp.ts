// In-memory OTP store (works fine for single admin use)
interface OTPEntry {
  otp: string;
  expiresAt: number;
}

declare global {
  var otpStore: Map<string, OTPEntry> | undefined;
}

const otpStore: Map<string, OTPEntry> = global.otpStore || new Map();
global.otpStore = otpStore;

export function storeOTP(email: string, otp: string) {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  });
}

export function verifyOTP(email: string, otp: string): boolean {
  const entry = otpStore.get(email);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(email);
    return false;
  }
  if (entry.otp !== otp) return false;
  otpStore.delete(email);
  return true;
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
