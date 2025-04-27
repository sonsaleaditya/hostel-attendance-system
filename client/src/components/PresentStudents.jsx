// src/components/PresentStudents.jsx
import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

const PresentStudents = ({ block }) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPresentStudents = async () => {
      try {
        const data = await fetchData(`/api/blocks/${block}/present`);
        setStudents(data.students);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPresentStudents();
  }, [block]);

  return (
    <div>
      <h2>Present Students in Block {block}</h2>
      {error && <p>{error}</p>}
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} ({student.reg_no})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PresentStudents;
