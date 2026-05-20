import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTPEmail(to: string, otp: string) {
  await transporter.sendMail({
    from: `"Ashutosh Portfolio" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Your Admin Login OTP',
    html: `
      <div style="font-family:monospace;background:#081c15;color:#fefae0;padding:40px;border-radius:8px;max-width:400px">
        <h2 style="color:#d4ff7d;margin-bottom:8px">Admin Login OTP</h2>
        <p style="color:#b7e4c7;font-size:14px;margin-bottom:24px">Your one-time password for portfolio admin access:</p>
        <div style="background:#0d2818;border:1px solid #2d6a4f;border-radius:4px;padding:24px;text-align:center;letter-spacing:0.4em;font-size:32px;color:#d4ff7d;font-weight:bold">${otp}</div>
        <p style="color:#52b788;font-size:12px;margin-top:24px">This OTP expires in 10 minutes. Do not share it.</p>
      </div>
    `,
  });
}
