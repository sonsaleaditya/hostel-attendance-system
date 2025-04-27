import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Clock, Shield, CheckCircle } from 'lucide-react'; // Assuming you are using these icons
import { fetchData } from '../utils/api';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState({ name: '', reg_no: '', block: '' });
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // Decode token payload manually using atob
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found, please sign in again');
      navigate('/signin');
      return;
    }

    const decodedToken = decodeToken(token);
    if (decodedToken) {
      setUserInfo({
        name: decodedToken.name || 'N/A',
        reg_no: decodedToken.reg_no || 'N/A',
        block: decodedToken.block || 'N/A',
      });
      checkAttendance(); 
    } else {
      setError('Invalid token. Please sign in again.');
      navigate('/signin');
    }
  }, [navigate]);

  const checkAttendance = async () => {
    try {
      const data = await fetchData('/api/attendance/get-attendance', {
        method: 'POST',
      });
  
      if (data?.attendanceRecords?.length === 0) {
        setAttendanceStatus('You have not marked attendance. Please mark your attendance.');
      } else {
        setAttendanceStatus('You have already marked your attendance for today.');
      }
    } catch (err) {
      console.error('Error checking attendance:', err);
      setAttendanceStatus('Error checking attendance status. Please try again.');
    }
  };
  

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchData('/api/users/update-password', {
        method: 'PUT',
        data: {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
      });
      alert(data.message);
      setNewPassword('');
      setCurrentPassword('');
    } catch (err) {
      console.error('Error updating password:', err);
      setError(err.message);
    }
  };

  const handleAttendance = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchData('/api/attendance/mark', {
        method: 'POST',
        data: { status: 'Present' },
      });
      alert(data.message);
      setShowSuccess(true); // Show success animation
      checkAttendance();
    } catch (err) {
      console.error('Error marking attendance:', err);
      setError(err.message);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {error && <div className="error-message">{error}</div>}

        <div className="grid">
          <div className="card">
            <div className="card-header">
              <User size={24} />
              <h3 className="card-title">User Information</h3>
            </div>
            <div className="user-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span>{userInfo.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Reg No:</span>
                <span>{userInfo.reg_no}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Block:</span>
                <span>{userInfo.block}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <Clock size={24} />
              <h3 className="card-title">Attendance Status</h3>
            </div>
            <p>{attendanceStatus}</p>
          </div>
        </div>

        {window.location.hash === '#attendance' && (
          <div className="card">
            <div className="card-header">
              <CheckCircle size={24} />
              <h3 className="card-title">Mark Attendance</h3>
            </div>
            <button
              onClick={handleAttendance}
              className={`button attendance-button ${showSuccess ? 'success' : ''}`}
            >
              Mark Attendance
            </button>
          </div>
        )}

        {window.location.hash === '#update-password' && (
          <div className="card">
            <div className="card-header">
              <Shield size={24} />
              <h3 className="card-title">Update Password</h3>
            </div>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="button">
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
