import React, { useState, useEffect } from 'react';
import api from '../services/api';

function MembershipList() {
  const [memberships, setMemberships] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/memberships', { headers: { Authorization: `Bearer ${token}` } });
        setMemberships(res.data);
      } catch (err) {
        setMessage('Error loading memberships');
      }
    };
    fetch();
  }, []);

  const extend = async (id) => {
    const months = prompt('Enter months to extend (6 default)', '6');
    if (!months) return;
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(
        `/memberships/${id}`,
        { extendMonths: months },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMemberships((m) => m.map(x => x._id === id ? res.data : x));
      setMessage('Membership extended');
    } catch (err) {
      setMessage('Error updating membership');
    }
  };

  const cancel = async (id) => {
    if (!window.confirm('Cancel this membership?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(
        `/memberships/${id}`,
        { cancel: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMemberships((m) => m.map(x => x._id === id ? res.data : x));
      setMessage('Membership cancelled');
    } catch (err) {
      setMessage('Error cancelling membership');
    }
  };

  return (
    <div>
      <h2>Memberships</h2>
      {message && <p>{message}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((m) => (
            <tr key={m._id}>
              <td>{m.membershipNumber}</td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{new Date(m.startDate).toLocaleDateString()}</td>
              <td>{new Date(m.endDate).toLocaleDateString()}</td>
              <td>{m.status}</td>
              <td>
                {m.status === 'active' && (
                  <>
                    <button onClick={() => extend(m._id)}>Extend</button>
                    <button onClick={() => cancel(m._id)}>Cancel</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MembershipList;