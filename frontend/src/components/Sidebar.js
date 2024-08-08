import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link to="/clientes">Clientes</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/fornecedores">Fornecedores</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/produtos">Produtos</Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar;
