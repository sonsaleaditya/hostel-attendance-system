import { useState } from 'react';
import { getDatePresent, getDateAbsent } from '../services/attendance';

function DateAttendance() {
  const [block, setBlock] = useState('A');
  const [date, setDate] = useState('');
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAttendance = async () => {
    if (!date) {
      setError('Please select a date');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const [presentData, absentData] = await Promise.all([
        getDatePresent(block, date),
        getDateAbsent(block, date),
      ]);
  
      // Update keys to match the actual API response
      setPresentStudents(presentData.presentStudents || []);
      setAbsentStudents(absentData.absentStudents || []);
    } catch (err) {
      setError('Failed to fetch attendance data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>Date-wise Attendance</h1>
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <div>
          <label style={{ marginRight: '1rem' }}>Select Block:</label>
          <select
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid black' }}
            disabled={loading}
          >
            {['A', 'B', 'C', 'D'].map((b) => (
              <option key={b} value={b}>Block {b}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ marginRight: '1rem' }}>Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid black' }}
            disabled={loading}
          />
        </div>
        <button 
          onClick={fetchAttendance} 
          className="btn"
          disabled={loading || !date}
        >
          {loading ? 'Loading...' : 'Fetch Attendance'}
        </button>
      </div>

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      
      {loading ? (
        <p>Loading attendance data...</p>
      ) : (
        <div className="grid">
          <div className="card">
            <h3>Present Students ({presentStudents.length})</h3>
            <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
              {presentStudents.map((student) => (
                <li key={student.reg_no} style={{ marginBottom: '0.5rem' }}>
                  {student.name} - {student.reg_no} ({student.room_no})
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Absent Students ({absentStudents.length})</h3>
            <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
              {absentStudents.map((student) => (
                <li key={student.reg_no} style={{ marginBottom: '0.5rem' }}>
                  {student.name} - {student.reg_no} ({student.room_no})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateAttendance;
