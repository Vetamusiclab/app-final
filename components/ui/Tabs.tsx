'use client';
import { useState, PropsWithChildren, ReactNode } from 'react';

export function Tabs({ children }: PropsWithChildren) { return <div className="w-full">{children}</div> }
export function TabList({ children }: { children: ReactNode }) { return <div className="flex gap-2 mb-4">{children}</div> }
export function Tab({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: ()=>void }){
  return <button onClick={onClick} className={`px-4 py-2 rounded-2xl border ${active?'bg-black/5':''}`}>{children}</button>
}
export function TabPanel({ children, active }: PropsWithChildren & { active?: boolean }){
  if (!active) return null; return <div>{children}</div>;
}
