import { useState } from 'react';

export default function PromoPage({ token }) {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://promo-backend-lwis.onrender.com/promo/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code, description }),
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Создать промокод</h2>
      <input value={code} onChange={e => setCode(e.target.value)} placeholder="Промокод" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Описание" />
      <button type="submit">Создать</button>
    </form>
  );
}
