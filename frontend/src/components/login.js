import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Adicione a lógica de autenticação aqui

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Se o login for bem-sucedido, redirecione para o dashboard
        navigate('/dashboard');
      } else {
        // Exiba uma mensagem de erro
        setError('Login falhou. Verifique suas credenciais.');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="login-container">
      <img src="/path/to/logo.png" alt="Logo" className="logo" />
      <h2>Bee App Tests</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Seu email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Sua senha</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="forgot-password">
          <a href="/forgot-password">Esqueci minha senha</a>
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
      <div className="register-message">
        Ainda não possui uma conta?
        <a href="/register" className="btn-link"> Faça seu cadastro!</a>
      </div>
    </div>
  );
}

export default Login;
