"use client";

import { useState } from "react";

type SelectProps = {
  options: { label: string; value: string }[];
  placeholder?: string;
  onSelect?: (value: string) => void;
};

export default function Select({ options, placeholder = "Выберите...", onSelect }: SelectProps) {
  const [selected, setSelected] = useState<string>("");

  return (
    <select
      className="border rounded-lg p-2 w-full"
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);
        onSelect?.(e.target.value);
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
