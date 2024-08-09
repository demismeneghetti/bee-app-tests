import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('danger');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password });
      setMessage('Login realizado com sucesso!');
      setMessageType('success');
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setMessage('Erro ao realizar login: ' + error.response.data.message);
      setMessageType('danger');
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="login-box">
            <img src={logo} alt="Logo" />
            <h2>Bee App Tests</h2>
            {message && <Alert variant={messageType}>{message}</Alert>}
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Seu email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Sua senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="forgot-password">
                <a href="#">Esqueci minha senha</a>
              </div>
              <Button variant="primary" onClick={handleLogin} className="btn-block">
                Entrar
              </Button>
              <div className="register-message">
                <p>Ainda não possui uma conta?</p>
                <a href="/register" className="register-link">Faça seu cadastro!</a>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
