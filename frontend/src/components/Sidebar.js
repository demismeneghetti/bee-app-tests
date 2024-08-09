import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <ListGroup>
        <Link href="/dashboard">
          <a className="list-group-item">Dashboard</a>
        </Link>
        <Link href="/products">
          <a className="list-group-item">Products</a>
        </Link>
        <Link href="/customers">
          <a className="list-group-item">Customers</a>
        </Link>
        <Link href="/suppliers">
          <a className="list-group-item">Suppliers</a>
        </Link>
      </ListGroup>
    </div>
  );
}

export default Sidebar;
