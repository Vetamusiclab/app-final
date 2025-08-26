'use client';

import { useState } from 'react';

const subscriptions: Record<string, string> = {
  Гитара: 'Абонемент на гитару',
  Вокал: 'Абонемент на вокал',
  Фортепиано: 'Абонемент на фортепиано',
  Барабаны: 'Абонемент на барабаны',
};

const SubscriptionPage = () => {
  const [selected, setSelected] = useState<string>('Гитара');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Ваши абонементы</h1>
      <div className="mt-4">
        <label htmlFor="direction" className="block mb-2">Выберите направление:</label>
        <select
          id="direction"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border p-2 rounded"
        >
          {Object.keys(subscriptions).map((dir) => (
            <option key={dir} value={dir}>
              {dir}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <p>Ваш абонемент: {subscriptions[selected]}</p>
      </div>
    </div>
  );
};

export default
