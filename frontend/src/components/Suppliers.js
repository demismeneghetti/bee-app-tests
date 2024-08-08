import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/suppliers`);
      setSuppliers(response.data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/suppliers`, newSupplier);
      setSuppliers([...suppliers, response.data]);
      setNewSupplier({ name: '', contact: '' });
    } catch (error) {
      console.error('Erro ao adicionar fornecedor', error);
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Fornecedores</h2>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Form onSubmit={handleAddSupplier}>
            <Form.Group controlId="formSupplierName">
              <Form.Label>Nome do Fornecedor</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newSupplier.name}
                onChange={handleInputChange}
                placeholder="Digite o nome do fornecedor"
              />
            </Form.Group>
            <Form.Group controlId="formSupplierContact" className="mt-3">
              <Form.Label>Contato do Fornecedor</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={newSupplier.contact}
                onChange={handleInputChange}
                placeholder="Digite o contato do fornecedor"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Adicionar Fornecedor
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
                <th>Contato</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier._id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Suppliers;
