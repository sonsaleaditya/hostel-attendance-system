import { Link } from 'react-router-dom';
import { Menu, Home, UserCheck, Key, LogOut } from 'lucide-react';
import { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/user/dashboard" className="nav-brand">
          <Home size={24} />
          Dashboard
        </Link>

        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={24} />
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {token ? (
            <>
              <button
                className="nav-link white-bg"
                onClick={() => window.location.hash = '#attendance'}
              >
                <UserCheck size={20} />
                Mark Attendance
              </button>
              <button
                className="nav-link white-bg"
                onClick={() => window.location.hash = '#update-password'}
              >
                <Key size={20} />
                Update Password
              </button>
              <button
                className="nav-link white-bg"
                onClick={handleLogout}
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-link white-bg">Sign In</Link>
              <Link to="/signup" className="nav-link white-bg">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
