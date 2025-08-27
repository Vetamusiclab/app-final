'use client';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 text-white">
      <h1 className="text-5xl font-bold mb-6">Добро пожаловать в MusicLab</h1>
      <p className="text-lg mb-8 max-w-xl text-center">
        Онлайн-платформа для музыкантов и учеников. Здесь можно учиться, заниматься и развиваться.
      </p>
      <a
        href="#"
        className="px-6 py-3 rounded-2xl bg-white text-purple-700 font-semibold shadow-lg hover:bg-gray-100 transition"
      >
        Начать
      </a>
    </main>
  );
}
