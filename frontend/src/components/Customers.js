import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';

function Clients() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/clients`);
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/clients`, newClient);
      setClients([...clients, response.data]);
      setNewClient({ name: '', email: '' });
    } catch (error) {
      console.error('Erro ao adicionar cliente', error);
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Clientes</h2>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Form onSubmit={handleAddClient}>
            <Form.Group controlId="formClientName">
              <Form.Label>Nome do Cliente</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newClient.name}
                onChange={handleInputChange}
                placeholder="Digite o nome do cliente"
              />
            </Form.Group>
            <Form.Group controlId="formClientEmail" className="mt-3">
              <Form.Label>Email do Cliente</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newClient.email}
                onChange={handleInputChange}
                placeholder="Digite o email do cliente"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Adicionar Cliente
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id}>
                  <td>{client._id}</td>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Clients;
