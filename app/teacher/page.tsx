'use client';
import React from 'react';
import Link from 'next/link';

const TeacherPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Преподаватель</h1>
      <div className="flex flex-col gap-2">
        <Link href="/teacher/schedule" className="btn border px-2 py-1 rounded">
          Расписание
        </Link>
        <Link href="/teacher/salary" className="btn border px-2 py-1 rounded">
          Зарплата
        </Link>
      </div>
    </div>
  );
};

export default TeacherPage;
