// src/components/AbsentByDate.jsx
import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

const AbsentByDate = ({ block, date }) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAbsentStudents = async () => {
      try {
        const data = await fetchData(`/api/blocks/${block}/absent/${date}`);
        setStudents(data.students);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAbsentStudents();
  }, [block, date]);

  return (
    <div>
      <h2>Absent Students in Block {block} on {date}</h2>
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

export default AbsentByDate;
