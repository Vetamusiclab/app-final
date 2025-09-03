// app/api/teacher/schedule/route.ts
import { NextResponse } from 'next/server';
import { getSlots, addSlot, setBooked, removeSlot } from '@/lib/scheduleStore';
import type { Slot, SlotsResponse } from '@/types/schedule';

const BAD = (msg: string, code = 400) => NextResponse.json({ ok: false, error: msg }, { status: code });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teacherId = searchParams.get('teacherId') || 'demo-teacher';
  const slots = getSlots(teacherId);
  const payload: SlotsResponse = { ok: true, teacherId, slots };
  return NextResponse.json(payload);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { teacherId?: string; timeISO?: string } | null;
  if (!body) return BAD('Invalid JSON');
  const teacherId = body.teacherId || 'demo-teacher';
  const timeISO = (body.timeISO || '').trim();
  if (!timeISO) return BAD('timeISO is required');

  // минимальная валидация
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(timeISO)) return BAD('timeISO must be YYYY-MM-DDTHH:mm');

  const slot = addSlot(teacherId, timeISO);
  return NextResponse.json({ ok: true, teacherId, slot });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null) as { teacherId?: string; id?: string; booked?: boolean } | null;
  if (!body) return BAD('Invalid JSON');
  const teacherId = body.teacherId || 'demo-teacher';
  const id = (body.id || '').trim();
  if (!id || typeof body.booked !== 'boolean') return BAD('id and booked are required');

  const updated = setBooked(teacherId, id, body.booked);
  if (!updated) return BAD('Slot not found', 404);
  return NextResponse.json({ ok: true, teacherId, slot: updated });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const teacherId = searchParams.get('teacherId') || 'demo-teacher';
  const id = searchParams.get('id') || '';
  if (!id) return BAD('id is required');

  const ok = removeSlot(teacherId, id);
  if (!ok) return BAD('Slot not found', 404);
  return NextResponse.json({ ok: true, teacherId, removed: id });
}
