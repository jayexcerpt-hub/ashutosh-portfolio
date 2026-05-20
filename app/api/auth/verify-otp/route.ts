import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '../../../../lib/otp';
import { signToken } from '../../../../lib/jwt';


export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL!;

    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 401 });
    }

    const valid = verifyOTP(email.toLowerCase(), otp);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    const token = signToken({ email: email.toLowerCase(), isAdmin: true });

    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('OTP verify error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
