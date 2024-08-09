"use client";

import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../styles/Topbar.css';

const logo = '/assets/logo.png';
const avatar = '/assets/avatar.png';

function Topbar() {
  const router = useRouter();
  const [user] = useState({
    name: 'Demis',
    photo: null,
  });

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="topbar">
      <Navbar.Brand>
        <Link href="/dashboard">
          <Image src={logo} alt="Logo" className="logo-small" />
        </Link>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <NavDropdown
          title={
            <Image
              src={user.photo || avatar}
              roundedCircle
              height="30"
              width="30"
              className="user-avatar"
            />
          }
          id="user-dropdown"
        >
          <div className="user-info">
            <Image
              src={user.photo || avatar}
              roundedCircle
              height="50"
              width="50"
            />
            <div className="user-name">{user.name}</div>
          </div>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} href="/profile">Minha conta</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default Topbar;
