// components/schedule/BookingModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/user';
import Select from '@/components/ui/Select';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (lesson: Lesson) => void;
  onDelete?: (id: string) => void;
  initial?: Partial<Lesson>;
  teachers: User[];
  audiences: string[];
  slotTime: string;
  currentUserId: string;
};

export default function BookingModal({
  open,
  onClose,
  onSave,
  onDelete,
  initial,
  teachers,
  audiences,
  slotTime,
  currentUserId
}: Props) {
  const [audience, setAudience] = useState(initial?.audience ?? audiences[0]);
  const [teacherId, setTeacherId] = useState(initial?.teacherId ?? teachers[0]?.id ?? '');
  const [studentName, setStudentName] = useState(initial?.studentName ?? '');
  const [status, setStatus] = useState<Lesson['status']>(initial?.status ?? 'scheduled');

  useEffect(() => {
    if (open) {
      setAudience(initial?.audience ?? audiences[0]);
      setTeacherId(initial?.teacherId ?? teachers[0]?.id ?? '');
      setStudentName(initial?.studentName ?? '');
      setStatus(initial?.status ?? 'scheduled');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial]);

  if (!open) return null;

  function submit() {
    const lesson: Lesson = {
      id: (initial?.id as string) ?? 'l_' + Math.random().toString(36).slice(2, 9),
      audience,
      time: slotTime,
      teacherId,
      studentName,
      status,
      createdBy: currentUserId
    };
    onSave(lesson);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-[420px] max-w-[95%]">
        <h3 className="text-lg font-medium mb-4">Запланировать урок — {slotTime}</h3>

        <div className="space-y-3">
          <Select
            label="Аудитория"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            options={audiences.map((a) => ({ value: a, label: a }))}
          />

          <Select
            label="Преподаватель"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            options={teachers.map((t) => ({ value: t.id, label: t.name }))}
          />

          <div className="flex flex-col">
            <label className="text-sm mb-1">Имя ученика</label>
            <input
              className="px-3 py-2 border rounded"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Фамилия Имя"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Статус</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Lesson['status'])}
              className="px-2 py-1 border rounded"
            >
              <option value="scheduled">Запланировано</option>
              <option value="one-off">Разовое / перенос</option>
              <option value="cancelled">Отменено</option>
            </select>
          </div>

          <div className="flex justify-between mt-4">
            {initial?.id && (
              <button
                onClick={() => {
                  if (onDelete && initial.id) {
                    if (confirm('Удалить занятие?')) {
                      onDelete(initial.id);
                      onClose();
                    }
                  }
                }}
                className="px-4 py-2 border text-red-600 rounded"
              >
                Удалить
              </button>
            )}

            <div className="ml-auto flex gap-2">
              <button onClick={onClose} className="px-4 py-2 border rounded">
                Отмена
              </button>
              <button onClick={submit} className="px-4 py-2 bg-primary text-white rounded">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
