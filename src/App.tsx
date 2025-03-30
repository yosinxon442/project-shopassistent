import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Calendar from './components/Calendar';
import Customers from './components/Customers';
import AddCustomer from './components/AddCustomer';
import Navigation from './components/Navigation';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && <Navigation />}
      <div className={!isAuthPage ? 'ml-64' : ''}>
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/reports" element={<div>Reports Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;