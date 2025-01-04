// src/components/AdminSignUp.jsx
import { useState } from 'react';
import { fetchData } from '../utils/api';

const AdminSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminSignUp = async (e) => {
    e.preventDefault();
    try {
      await fetchData('/api/admin/create', {
        method: 'POST',
        data: { name, email, password },
      });
      alert('Admin created successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleAdminSignUp}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Create Admin</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminSignUp;
