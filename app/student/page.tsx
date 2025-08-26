'use client';
import React, { useState } from 'react';
import Select from '@/components/ui/Select';

const StudentPage = () => {
  const directions = ['Гитара', 'Вокал', 'Фортепиано', 'Барабаны'];
  const [selected, setSelected] = useState(directions[0]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Привет, студент!</h1>
      {directions.length > 1 && (
        <Select options={directions} value={selected} onChange={setSelected} />
      )}
      <div className="mt-4">
        <p>Вы выбрали направление: {selected}</p>
      </div>
    </div>
  );
};

export default StudentPage;
