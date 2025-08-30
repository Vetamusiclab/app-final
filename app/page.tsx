'use client';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
        Добро пожаловать в <span className="text-yellow-300">MusicLab</span>
      </h1>

      <p className="text-lg mb-10 max-w-2xl leading-relaxed opacity-90">
        Онлайн-платформа для музыкантов и учеников.  
        Учись, занимайся и развивайся вместе с нами.
      </p>

      <a
        href="#"
        className="px-8 py-4 rounded-2xl bg-white text-purple-700 font-semibold shadow-xl hover:bg-gray-100 transition transform hover:scale-105"
      >
        🚀 Начать
      </a>
    </main>
  );
}
