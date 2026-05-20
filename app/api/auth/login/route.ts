import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { generateOTP, storeOTP } from '../../../../lib/otp';
import { sendOTPEmail } from '../../../../lib/mailer';


export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: 'Admin not configured' }, { status: 500 });
    }

    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Compare password - supports both plain and bcrypt hashed
    let passwordMatch = false;
    if (adminPassword.startsWith('$2')) {
      passwordMatch = await bcryptjs.compare(password, adminPassword);
    } else {
      passwordMatch = password === adminPassword;
    }

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate OTP
    const otp = generateOTP();
    storeOTP(email.toLowerCase(), otp);

    // Try to send email, fall back to console log in dev
    let emailSent = false;
    let devOtp: string | null = null;

    try {
      await sendOTPEmail(email, otp);
      emailSent = true;
    } catch (emailError) {
      console.error('Email send failed:', emailError);
      // In development, expose OTP so login still works
      if (process.env.NODE_ENV !== 'production') {
        devOtp = otp;
        console.log(`\n🔑 DEV MODE OTP for ${email}: ${otp}\n`);
      }
    }

    return NextResponse.json({
      message: emailSent
        ? 'OTP sent to your email. Please check your inbox.'
        : 'Email delivery failed. Check server logs for OTP.',
      success: true,
      // Only expose in dev when email fails
      ...(devOtp ? { devOtp } : {}),
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
