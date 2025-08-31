import Link from 'next/link';

export default function RoleSelectionPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg text-text">
      <div className="bg-white rounded-2xl p-8 shadow-lg w-[360px] text-center">
        <h2 className="text-2xl font-bold mb-6">Выберите роль</h2>

        <div className="flex flex-col gap-3">
          <Link href="/login/student" className="block px-4 py-2 bg-primary text-white rounded-lg">
            Ученик
          </Link>
          <Link href="/login/teacher" className="block px-4 py-2 bg-primary text-white rounded-lg">
            Преподаватель
          </Link>
          <Link href="/login/admin" className="block px-4 py-2 bg-primary text-white rounded-lg">
            Админ
          </Link>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-sm text-[#333] hover:underline">
            Назад на главную
          </Link>
        </div>
      </div>
    </main>
  );
}
