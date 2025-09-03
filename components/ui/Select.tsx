// components/ui/Select.tsx
'use client';

import React from 'react';

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
  id?: string;
};

export default function Select({ options, value, onChange, className = '', id }: Props) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 border rounded ${className}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
