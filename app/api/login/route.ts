import { NextRequest, NextResponse } from 'next/server';
import connect from '@/libs/db';
import User from '@/models/User';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  await connect();

  const { username, password } = await request.json();

  const user = await User.findOne({ username, password });

  if (!user) {
    return Response.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('3d')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  const response = NextResponse.json({ username });

  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
    sameSite: 'strict',
  });

  return response;
}
