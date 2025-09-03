// app/api/sessions/teacher/[id]/route.ts
import { NextResponse } from 'next/server';
import { getSessionsByTeacher } from '@/lib/sessions';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const sessions = await getSessionsByTeacher(id);
  return NextResponse.json(sessions);
}
