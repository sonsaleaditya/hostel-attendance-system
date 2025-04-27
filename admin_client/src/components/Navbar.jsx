// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../services/admin';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('adminToken');

  const handleLogout = () => {
    logoutAdmin(); // Remove token
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Admin Portal
        </Link>
        <div className="navbar-links">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/block-attendance">Block Attendance</Link>
              <Link to="/date-attendance">Date Attendance</Link>
              <Link to="/send-mail">Send Mail</Link>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
