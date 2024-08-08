import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import '../styles/Topbar.css';

function Topbar() {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Demis',
    photo: null,
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="topbar">
      <Navbar.Brand href="#home">
        <img src={logo} alt="Logo" className="logo-small" />
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
          alignRight
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
          <NavDropdown.Item onClick={() => navigate('/profile')}>Minha conta</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default Topbar;
