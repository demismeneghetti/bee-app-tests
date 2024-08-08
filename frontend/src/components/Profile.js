import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function Profile() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getUserData`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('user')}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao obter dados do utilizador', error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setUser({ ...user, phone: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/updateProfile`, user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('user')}` },
      });
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil', error);
      alert('Erro ao atualizar perfil');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card>
            <Card.Header>
              <h2>Minha conta</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formFullName">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formPhone" className="mt-3">
                  <Form.Label>Telefone</Form.Label>
                  <PhoneInput
                    country={'us'}
                    value={user.phone}
                    onChange={handlePhoneChange}
                    inputStyle={{ width: '100%' }}
                  />
                </Form.Group>
                <Form.Group controlId="formCurrentPassword" className="mt-3">
                  <Form.Label>Senha Atual</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={user.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Digite sua senha atual"
                  />
                </Form.Group>
                <Form.Group controlId="formNewPassword" className="mt-3">
                  <Form.Label>Nova Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={user.newPassword}
                    onChange={handleInputChange}
                    placeholder="Digite sua nova senha"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Atualizar Perfil
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;

