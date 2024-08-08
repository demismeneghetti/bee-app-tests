import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import '../styles/Dashboard.css'; // Adicione os estilos aqui

function Dashboard() {
  return (
    <div>
      <Topbar />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <h1>Bem-vindo ao Dashboard</h1>
          {/* Conteúdo principal do dashboard */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
