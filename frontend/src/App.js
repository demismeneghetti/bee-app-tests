import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Clients from './components/Clients';
import Suppliers from './components/Suppliers';
import Profile from './components/Profile';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
            <Route path="/products" element={<PrivateRoute element={Products} />} />
            <Route path="/clients" element={<PrivateRoute element={Clients} />} />
            <Route path="/suppliers" element={<PrivateRoute element={Suppliers} />} />
            <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainLayout() {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/products" element={<PrivateRoute element={Products} />} />
          <Route path="/clients" element={<PrivateRoute element={Clients} />} />
          <Route path="/suppliers" element={<PrivateRoute element={Suppliers} />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
