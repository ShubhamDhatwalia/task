import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [students, setStudents] = useState([]);
    const token = localStorage.getItem("token");
    
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://3.25.82.198:3000/Teacher/api/class-student",
          {
            headers: { token: `${token}` },
          }
        );
          
        
        setStudents(response.data.data[0].student_data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(
        "http://3.25.82.198:3000/Teacher/api/delete-student", 
        {
          headers: { token: `${token}` },
          data: { _id: id }
        }
      );
      
      console.log(response.data); // Log response to see what is returned
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };
  

  return (
    <div>
      <h1>Students List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.first_name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleDelete(student._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
