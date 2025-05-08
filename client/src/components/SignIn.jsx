import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchData } from '../utils/api';
import '../styles/SignIn.css';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [block, setBlock] = useState('A');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchData('/api/users/signin', {
        method: 'POST',
        data: { reg_no: regNo, password, block },
      });
      
      localStorage.setItem('authToken', data.token);
      toast.success('Sign in successful!');
      navigate('/user/dashboard');
    } catch (err) {
      toast.error('Sign in failed!');
      setError(err.message || 'Failed to sign in');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Sign In</h2>
        <form className="signin-form" onSubmit={handleSignIn}>
          <div className="form-group">
            <label className="form-label">Registration Number</label>
            <input
              className="form-input"
              type="text"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="Enter your registration number"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Block</label>
            <select 
              className="form-select"
              value={block} 
              onChange={(e) => setBlock(e.target.value)}
            >
              <option value="A">Block A</option>
              <option value="B">Block B</option>
              <option value="C">Block C</option>
              <option value="D">Block D</option>
            </select>
          </div>
          
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
