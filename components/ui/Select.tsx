// components/ui/Select.tsx
'use client';

import React from 'react';

type Option = { value: string; label: string };

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  label?: string;
};

export default function Select({ options, label, ...rest }: Props) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm mb-1">{label}</label>}
      <select
        {...rest}
        className="px-3 py-2 border rounded bg-white text-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
