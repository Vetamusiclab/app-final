// app/api/sessions/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getAllSessions,
  getSessionsByTeacher,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
} from '@/lib/sessions';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const teacherId = url.searchParams.get('teacherId');

  try {
    if (teacherId) {
      const sessions = await getSessionsByTeacher(teacherId);
      return NextResponse.json(sessions);
    }
    const sessions = await getAllSessions();
    return NextResponse.json(sessions);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // validate minimally
    if (!body.teacherId || !body.title || !body.start || !body.end) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const created = await createSession({
      teacherId: body.teacherId,
      title: body.title,
      start: body.start,
      end: body.end,
      status: body.status ?? 'free',
      studentId: body.studentId ?? null,
    } as any);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    const updated = await updateSession(body.id, body);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const ok = await deleteSession(id);
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
                                        }
