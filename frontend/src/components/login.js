"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter ao invés de useNavigate para Next.js
import '../styles/Login.css';

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implementar a lógica de autenticação aqui
    // Redirecionar para o dashboard em caso de sucesso
    try {
      // Simulando uma autenticação bem-sucedida
      if (email === 'teste@teste.com' && password === 'senha123') {
        router.push('/dashboard');
      } else {
        setError('Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao tentar fazer login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
