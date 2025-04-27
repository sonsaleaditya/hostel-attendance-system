import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Landing.css';

function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing">
      <div className="landing-content">
        <h1>Student Attendance Management System</h1>
        <p className="subtitle">Efficient tracking and management of student attendance</p>
        
        <div className="features">
          <div className="feature">
            <h3>Block-wise Tracking</h3>
            <p>Monitor attendance across different hostel blocks</p>
          </div>
          <div className="feature">
            <h3>Date-wise Reports</h3>
            <p>Access historical attendance data by date</p>
          </div>
          <div className="feature">
            <h3>Real-time Updates</h3>
            <p>Get instant updates on student attendance status</p>
          </div>
        </div>

        <div className="cta-buttons">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn btn-outline">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Landing;