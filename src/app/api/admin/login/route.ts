import { NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const ADMIN_PASSWORDS = (process.env.ADMIN_PASSWORDS || process.env.ADMIN_PASSWORD || '').split(',');

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!ADMIN_PASSWORDS.includes(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign({ admin: true }, process.env.ADMIN_PASSWORDS || process.env.ADMIN_PASSWORD || 'secret', {
      expiresIn: '7d',
    });

    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
