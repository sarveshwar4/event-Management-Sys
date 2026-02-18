import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Membership from './pages/Membership';
import MembershipList from './pages/MembershipList';
import Reports from './pages/Reports';
import Transactions from './pages/Transactions';
import UpdateMembership from './pages/UpdateMembership';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/membership"
        element={
          <ProtectedRoute role="admin">
            <Membership />
          </ProtectedRoute>
        }
      />
      <Route
        path="/memberships"
        element={
          <ProtectedRoute role="admin">
            <MembershipList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/membership/update"
        element={
          <ProtectedRoute role="admin">
            <UpdateMembership />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;