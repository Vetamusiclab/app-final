'use client';
import { PropsWithChildren } from 'react';
export default function Modal({ children }: PropsWithChildren){
  return <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow-soft p-6 w-full max-w-lg">{children}</div>
  </div>;
}
