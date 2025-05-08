import { useState } from 'react';
import './SignUp.css';
import { fetchData } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { toast } from 'react-toastify';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      reg_no: regNo,
      password,
      room_no: roomNo,
    };

    try {
      const response = await fetchData('/api/users/signup', {
        method: 'POST',
        data: userData,
      });

      if (response) {
        toast.success('User Registered Successfully!');
        navigate('/signin');
      }
    } catch (err) {
      toast.error('Registration failed!');
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Registration Number"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Room Number"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="signin-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
