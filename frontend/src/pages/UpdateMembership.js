import React, { useState } from 'react';
import api from '../services/api';

function UpdateMembership() {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [membership, setMembership] = useState(null);
  const [message, setMessage] = useState('');
  const [extendMonths, setExtendMonths] = useState('6');
  const [cancel, setCancel] = useState(false);

  const fetchMembership = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get(`/memberships?number=${membershipNumber}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.length > 0) {
        setMembership(res.data[0]);
      } else {
        setMessage('Not found');
      }
    } catch (err) {
      setMessage('Error fetching');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!membership) return;
    try {
      const token = localStorage.getItem('token');
      const body = {};
      if (cancel) body.cancel = true;
      else body.extendMonths = extendMonths;
      const res = await api.put(`/memberships/${membership._id}`, body, { headers: { Authorization: `Bearer ${token}` } });
      setMembership(res.data);
      setMessage('Updated');
    } catch (err) {
      setMessage('Error updating');
    }
  };

  return (
    <div>
      <h2>Update Membership</h2>
      <div>
        <label>Membership Number</label>
        <input
          value={membershipNumber}
          onChange={(e) => setMembershipNumber(e.target.value)}
        />
        <button onClick={fetchMembership}>Load</button>
      </div>
      {membership && (
        <form onSubmit={submit}>
          <div>
            <label>Name</label>
            <input value={membership.name} readOnly />
          </div>
          <div>
            <label>Email</label>
            <input value={membership.email} readOnly />
          </div>
          <div>
            <label>Start Date</label>
            <input value={new Date(membership.startDate).toISOString().slice(0,10)} readOnly />
          </div>
          <div>
            <label>End Date</label>
            <input value={new Date(membership.endDate).toISOString().slice(0,10)} readOnly />
          </div>
          <div>
            <label>Extend Months</label>
            <select value={extendMonths} onChange={(e) => setExtendMonths(e.target.value)}>
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
            </select>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={cancel}
                onChange={(e) => setCancel(e.target.checked)}
              /> Cancel membership
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateMembership;