import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/jwt';
import { connectDB } from '../../../lib/mongodb';
import Portfolio from '../../../models/Portfolio';


async function isAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return false;
  const payload = verifyToken(token);
  return payload?.isAdmin === true;
}

export async function GET() {
  try {
    await connectDB();
    let portfolio = await Portfolio.findOne({});
    if (!portfolio) {
      portfolio = await Portfolio.create({});
    }
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Portfolio GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const data = await req.json();
    let portfolio = await Portfolio.findOne({});
    if (!portfolio) {
      portfolio = await Portfolio.create(data);
    } else {
      Object.assign(portfolio, data);
      await portfolio.save();
    }
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Portfolio PUT error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
