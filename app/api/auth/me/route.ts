import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/jwt';


export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return NextResponse.json({ isAdmin: false });
  const payload = verifyToken(token);
  if (!payload?.isAdmin) return NextResponse.json({ isAdmin: false });
  return NextResponse.json({ isAdmin: true, email: payload.email });
}
