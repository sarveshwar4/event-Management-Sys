import React from 'react';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}</p>
      {user.role === 'admin' && (
        <div>
          <p>You have admin access.</p>
          <ul>
            <li><a href="/membership">Add Membership</a></li>
            <li><a href="/membership/update">Update Membership</a></li>
            <li><a href="/memberships">Manage Memberships</a></li>
            <li><a href="/reports">Reports</a></li>
            <li><a href="/transactions">Transactions</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;