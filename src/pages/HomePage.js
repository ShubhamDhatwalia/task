import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [students, setStudents] = useState([]);
    const token = localStorage.getItem("token");
    console.log(token);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://3.25.82.198:3000/Teacher/api/class-student",
          {
            headers: { token: `${token}` },
          }
        );
          console.log(response.data.data[0].student_data);

        setStudents(response.data.data[0].student_data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://3.25.82.198:3000/Teacher/api/delete-student", {
        headers: { token: `${token}` },
        data: { _id: id },
      });
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
