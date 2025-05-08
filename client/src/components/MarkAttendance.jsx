// src/components/MarkAttendance.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/api';
import {toast} from 'react-toastify';

const MarkAttendance = () => {
  const [status, setStatus] = useState('Present');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      // Make the API call to mark attendance
      await fetchData('/api/attendance/mark', {
        method: 'POST',
        data: { status },
      });

      toast.success('Attendance marked successfully!');

      navigate('/dashboard'); // Redirect to dashboard after success
    } catch (err) {
      setError(err.message);
      toast.error('Failed to mark attendance!');
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <form onSubmit={handleMarkAttendance}>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>
        <button type="submit">Mark Attendance</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default MarkAttendance;
