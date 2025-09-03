// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/users';

export async function GET() {
  const users = await getAllUsers();
  return NextResponse.json(users);
}
