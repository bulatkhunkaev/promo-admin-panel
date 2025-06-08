import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    channel: '',
    avatar: '',
    topic: '',
    email: '',
    login: '',
    password: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://promo-backend-lwis.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Регистрация прошла успешно!');
      navigate('/login'); // ✅ переходим на страницу входа
    } else {
      alert(data.error || 'Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация бренда</h2>
      {Object.keys(formData).map(key => (
        <div key={key}>
          <input
            type={key === 'password' ? 'password' : 'text'}
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
