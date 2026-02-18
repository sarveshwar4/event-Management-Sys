import React, { useState } from 'react';
import api from '../services/api';

function Membership() {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('6');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        '/memberships',
        { membershipNumber, name, email, startDate, durationMonths: duration },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Membership created: ' + res.data.membershipNumber);
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Add Membership</h2>
      <form onSubmit={submit}>
        <div>
          <label>Membership Number</label>
          <input value={membershipNumber} onChange={(e) => setMembershipNumber(e.target.value)} required />
        </div>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>Duration</label>
          <div>
            <label><input type="radio" value="6" checked={duration === '6'} onChange={(e) => setDuration(e.target.value)} /> 6 months</label>
            <label><input type="radio" value="12" checked={duration === '12'} onChange={(e) => setDuration(e.target.value)} /> 1 year</label>
            <label><input type="radio" value="24" checked={duration === '24'} onChange={(e) => setDuration(e.target.value)} /> 2 years</label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Membership;