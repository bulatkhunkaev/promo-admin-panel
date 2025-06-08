import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PromoPage from './pages/PromoPage';

function Navigation({ token, logout }) {
  return (
    <nav>
      {!token && (
        <>
          <Link to="/">Регистрация</Link> | <Link to="/login">Вход</Link>
        </>
      )}
      {token && (
        <>
          <Link to="/promo">Промокоды</Link> | <button onClick={logout}>Выйти</button>
        </>
      )}
    </nav>
  );
}

function App() {
  const [token, setToken] = useState(null);

  const logout = () => {
    setToken(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <Navigation token={token} logout={logout} />
      <Routes>
        {!token && <Route path="/" element={<RegisterPage />} />}
        {!token && <Route path="/login" element={<LoginPage setToken={setToken} />} />}
        {token && <Route path="/promo" element={<PromoPage token={token} />} />}
        {/* Перенаправления для несуществующих маршрутов */}
        <Route path="*" element={<Navigate to={token ? "/promo" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
