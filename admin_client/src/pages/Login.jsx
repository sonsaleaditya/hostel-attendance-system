import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/admin';
import '../styles/Login.css';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginAdmin(formData);
      const { token } = response;
      if (token) {
        toast.success('Login successful!');
        localStorage.setItem('adminToken', token);
        navigate('/dashboard');
      } else {
        throw new Error('Login failed: No token provided');
      }
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoComplete="email"
          />
        </div>

        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
