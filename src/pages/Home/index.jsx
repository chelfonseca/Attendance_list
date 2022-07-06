import React, { useState, useEffect } from 'react';
import './styles.css';
import { Card } from '../../components/Card'


export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' })

  function handleAddStundent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
    setStudents(prevState => [...prevState, newStudent])
    setStudentName('');

  };

  useEffect(() => {
    fetch('https://api.github.com/users/chelfonseca')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      })
  }, [])



  return (
    <div className='container'>
      <header>
        <h1>Attendance list</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="shotface" />
        </div>

      </header>
      <input
        type="text"
        placeholder="Type your name"
        value={studentName}
        onChange={e =>
          setStudentName(e.target.value)
        }

      />
      <button type="button" onClick={handleAddStundent}>Add</button>

      {
        students.map(student => (
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />))
      }
    </div>

  )
}


