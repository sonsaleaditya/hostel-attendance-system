import { useState, useEffect } from 'react';
import api from '../services/block';
import '../styles/DashBoard.css'
function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    // Function to decode the token and extract admin info
    const extractAdminInfo = () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const base64Payload = token.split('.')[1]; // Extract payload part of JWT
          const payload = atob(base64Payload); // Decode base64 string
          const admin = JSON.parse(payload); // Parse JSON string
          setAdminInfo({
            name: admin.name,
            userId: admin.userId,
            email: admin.email,
            role: admin.role,
          });
        } catch (err) {
          console.error('Error decoding token:', err);
        }
      }
    };

    // Fetch attendance data
    const fetchAttendanceData = async () => {
      try {
        const blocks = ['A', 'B', 'C', 'D'];

        // Fetch present students for each block
        const blockStats = await Promise.all(
          blocks.map(async (block) => {
            try {
              const presentResponse = await api.getPresentStudentsByBlock(block);
              return {
                block,
                present: presentResponse.presentStudents.length,
              };
            } catch (blockError) {
              console.error(`Error fetching data for block ${block}:`, blockError);
              return {
                block,
                present: 0,
              };
            }
          })
        );

        setStats(blockStats);
      } catch (err) {
        console.error('Error fetching attendance data:', err);
        setError('Failed to load attendance data');
      } finally {
        setLoading(false);
      }
    };

    // Call both functions
    extractAdminInfo();
    fetchAttendanceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>Block-Wise Attendance Dashboard</h1>

      {/* Admin Information Section */}
      {adminInfo && (
        <div style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>Admin Information</h3>
          <p><strong>Name:</strong> {adminInfo.name}</p>
          <p><strong>Email:</strong> {adminInfo.email}</p>
          <p><strong>Role:</strong> {adminInfo.role}</p>
          <p><strong>User ID:</strong> {adminInfo.userId}</p>
        </div>
      )}

      {/* Attendance Stats Section */}
      <div className="grid">
        {stats.length === 0 ? (
          <div>No data available</div>
        ) : (
          stats.map(({ block, present }) => (
            <div className="card" key={block}>
              <h3>Block {block}</h3>
              <p>Present Students: {present}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
