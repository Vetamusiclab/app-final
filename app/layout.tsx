import "./globals.css";
import Header from "@/components/layout/Header";
import type { ReactNode } from "react";

export const metadata = {
  title: "MUSIC.LAB",
  description: "Творческая Лаборатория Веты Гулливер",
};

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
