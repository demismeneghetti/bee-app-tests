import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/Register.css'; // Certifique-se de que o caminho está correto

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Adicione a lógica de registro aqui
  };

  return (
    <div className="register-container">
      <img src="/path/to/your/logo.png" alt="Logo" />
      <h2>Cadastro</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formUsername">
          <Form.Label>Seu email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Sua senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirme sua senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="btn-primary">
          Registrar
        </Button>
        <div className="login-message">
          Já possui uma conta? <a href="/login" className="login-link">Faça login!</a>
        </div>
      </Form>
    </div>
  );
};

export default Register;
