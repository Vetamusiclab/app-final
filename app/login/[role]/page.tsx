import LoginForm from './LoginForm';

export default function RoleLoginPage({ params }: { params: { role: string } }) {
  const role = params.role; // 'student' | 'teacher' | 'admin'
  // Можно добавить проверку валидности role, если нужно.

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg text-text p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Вход — {role === 'student' ? 'Ученик' : role === 'teacher' ? 'Преподаватель' : 'Админ'}</h1>
        <LoginForm role={role} />
      </div>
    </main>
  );
}
