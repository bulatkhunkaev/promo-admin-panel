import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setToken }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://promo-backend-lwis.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      alert('Успешный вход!');
      navigate('/promo'); // ✅ переход к промокодам
    } else {
      alert(data.error || 'Ошибка входа');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Login" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Войти</button>
    </form>
  );
}
