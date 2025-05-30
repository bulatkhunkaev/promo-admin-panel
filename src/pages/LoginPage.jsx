import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://YOUR-BACKEND-URL/login', { login, password });
      localStorage.setItem('token', res.data.token);
      navigate('/promo');
    } catch (error) {
      alert('Ошибка входа');
    }
  };

  return (
    <div>
      <h2>Вход в админку</h2>
      <form onSubmit={handleLogin}>
        <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" required /><br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" type="password" required /><br />
        <button type="submit">Войти</button>
      </form>
      <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
    </div>
  );
}

export default LoginPage;
