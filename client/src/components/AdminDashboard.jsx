import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';
import PresentStudents from './PresentStudents';
import AbsentStudents from './AbsentStudents.jsx';

const AdminDashboard = () => {
  const [block, setBlock] = useState('A');
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [error, setError] = useState('');

  const handleBlockChange = (e) => {
    setBlock(e.target.value);
  };

  useEffect(() => {
    // Fetch the present students when the block is changed
    const fetchStudents = async () => {
      try {
        const presentData = await fetchData(`/api/blocks/${block}/present`);
        const absentData = await fetchData(`/api/blocks/${block}/absent`);
        
        setPresentStudents(presentData.students);
        setAbsentStudents(absentData.students);
      } catch (err) {
        setError('Error fetching students data');
        console.error(err);
      }
    };

    fetchStudents();
  }, [block]); // Re-fetch when block changes

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <label>Select Block: </label>
        <select value={block} onChange={handleBlockChange}>
          <option value="A">Block A</option>
          <option value="B">Block B</option>
          <option value="C">Block C</option>
          <option value="D">Block D</option>
        </select>
      </div>

      {error && <p>{error}</p>}

      <div>
        <h3>Present Students in Block {block}</h3>
        <PresentStudents students={presentStudents} />
      </div>

      <div>
        <h3>Absent Students in Block {block}</h3>
        <AbsentStudents students={absentStudents} />
      </div>
    </div>
  );
};

export default AdminDashboard;
