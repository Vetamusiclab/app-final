// app/api/teacher/schedule/route.ts
import { NextResponse } from 'next/server';
import { getLessons, addLesson, updateLesson, removeLesson } from '@/lib/scheduleStore';
import type { LessonsResponse, LessonStatus } from '@/types/schedule';

const BAD = (msg: string, code = 400) => NextResponse.json({ ok: false, error: msg }, { status: code });

// Получить все занятия учителя (фронт отфильтрует по неделе)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teacherId = searchParams.get('teacherId') || 'demo-teacher';
  const lessons = getLessons(teacherId);
  const payload: LessonsResponse = { ok: true, teacherId, lessons };
  return NextResponse.json(payload);
}

// Создать занятие
export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as {
    teacherId?: string;
    startISO?: string;
    durationMinutes?: number;
    subject?: string;
    studentName?: string;
    comment?: string;
  } | null;

  if (!body) return BAD('Invalid JSON');
  const teacherId = body.teacherId || 'demo-teacher';
  const startISO = (body.startISO || '').trim();
  const duration = Number(body.durationMinutes || 0);
  const subject = (body.subject || 'Урок').trim();
  const studentName = (body.studentName || 'Ученик').trim();
  const comment = body.comment?.trim();

  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(startISO)) return BAD('startISO must be YYYY-MM-DDTHH:mm');
  if (!duration || duration <= 0) return BAD('durationMinutes must be > 0');

  const lesson = addLesson(teacherId, startISO, duration, subject, studentName, comment);
  return NextResponse.json({ ok: true, teacherId, lesson });
}

// Частичное обновление занятия
export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null) as {
    teacherId?: string;
    id?: string;
    status?: LessonStatus;
    startISO?: string;
    durationMinutes?: number;
    subject?: string;
    studentName?: string;
    comment?: string;
    replacementTeacherName?: string;
  } | null;

  if (!body) return BAD('Invalid JSON');
  const teacherId = body.teacherId || 'demo-teacher';
  const id = (body.id || '').trim();
  if (!id) return BAD('id is required');

  const updated = updateLesson(teacherId, id, {
    status: body.status,
    startISO: body.startISO,
    durationMinutes: body.durationMinutes,
    subject: body.subject,
    studentName: body.studentName,
    comment: body.comment,
    replacementTeacherName: body.replacementTeacherName,
  });

  if (!updated) return BAD('Lesson not found', 404);
  return NextResponse.json({ ok: true, teacherId, lesson: updated });
}

// Удалить занятие
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const teacherId = searchParams.get('teacherId') || 'demo-teacher';
  const id = searchParams.get('id') || '';
  if (!id) return BAD('id is required');
  const ok = removeLesson(teacherId, id);
  if (!ok) return BAD('Lesson not found', 404);
  return NextResponse.json({ ok: true, teacherId, removed: id });
}
