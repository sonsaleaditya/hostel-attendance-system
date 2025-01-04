// src/components/AdminSignIn.jsx
import { useState } from 'react';
import { fetchData } from '../utils/api';

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchData('/api/admin/login', {
        method: 'POST',
        data: { email, password },
      });
      document.cookie = `authToken=${data.token}; path=/`; // Store token in cookies
      alert('Admin logged in successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleAdminSignIn}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Admin Sign In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminSignIn;
