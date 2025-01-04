import { useState, useEffect } from 'react';
import { getBlockPresent, getBlockAbsent } from '../services/attendance';
import { Search } from 'lucide-react';
import '../styles/BlockAttendance.css';

function BlockAttendance() {
  const [block, setBlock] = useState('A');
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAttendance = async () => {
    setLoading(true);
    setError('');
    try {
      const [presentData, absentData] = await Promise.all([
        getBlockPresent(block),
        getBlockAbsent(block),
      ]);

      setPresentStudents(presentData.presentStudents);
      setAbsentStudents(absentData.nonPresentStudents);
    } catch (err) {
      setError('Failed to fetch attendance data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [block]);

  const filterStudents = (students) => {
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.reg_no.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPresentStudents = filterStudents(presentStudents);
  const filteredAbsentStudents = filterStudents(absentStudents);

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Block Attendance</h1>
      
      <div className="controls-container">
        <div className="block-selector">
          <label className="block-label">Select Block:</label>
          <select
            className="block-select"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            disabled={loading}
          >
            {['A', 'B', 'C', 'D'].map((b) => (
              <option key={b} value={b}>Block {b}</option>
            ))}
          </select>
        </div>

        <div className="search-container">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by name or registration number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loading-text">Loading attendance data...</p>
        </div>
      ) : (
        <div className="tables-container">
          <div className="attendance-table">
            <h3 className="table-title">Present Students ({filteredPresentStudents.length})</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Registration No.</th>
                    <th>Room No.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPresentStudents.map((student) => (
                    <tr key={student.reg_no}>
                      <td>{student.name}</td>
                      <td>{student.reg_no}</td>
                      <td>{student.room_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="attendance-table">
            <h3 className="table-title">Absent Students ({filteredAbsentStudents.length})</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Registration No.</th>
                    <th>Room No.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAbsentStudents.map((student) => (
                    <tr key={student.reg_no}>
                      <td>{student.name}</td>
                      <td>{student.reg_no}</td>
                      <td>{student.room_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlockAttendance;