import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    channel: '',
    avatar: '',
    topic: '',
    email: '',
    login: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      await axios.post('https://YOUR-BACKEND-URL/register', formData);
      alert('Регистрация прошла успешно');
      navigate('/');
    } catch (error) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <div>
      <h2>Регистрация бренда</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Название бренда"
          onChange={handleChange}
          required
        /><br />
        <input
          name="channel"
          placeholder="Ссылка на канал"
          onChange={handleChange}
          required
        /><br />
        <input
          name="avatar"
          placeholder="URL логотипа"
          onChange={handleChange}
          required
        /><br />
        <input
          name="topic"
          placeholder="Тематика"
          onChange={handleChange}
          required
        /><br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br />
        <input
          name="login"
          placeholder="Логин"
          onChange={handleChange}
          required
        /><br />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handleChange}
          required
        /><br />
        <input
          name="confirm_password"
          type="password"
          placeholder="Подтвердите пароль"
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>
        Уже есть аккаунт? <Link to="/">Войти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
