'use client';

import React from 'react';

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function Select({ options, value, onChange }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
