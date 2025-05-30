import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PromoPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://YOUR-BACKEND-URL/promo/create',
        { code, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Промокод создан');
      setCode('');
      setDescription('');
    } catch (error) {
      alert('Ошибка создания промокода');
    }
  };

  return (
    <div>
      <h2>Создание промокода</h2>
      <form onSubmit={handleSubmit}>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Промокод" required /><br />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" required /><br />
        <button type="submit">Создать</button>
      </form>
      <br />
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default PromoPage;
