import React, { useEffect, useState } from "react";
import styles from "./StudentComplaints.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../../Components/Sidebar/Sidebar";

const StudentsComplaints = () => {
  const [allStudents, setallStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/students/`)
      .then((response) => {
        setallStudents(response.data);
      })
      .catch((error) => {
        console.error("Error error imy", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/students/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Students Complaints</div>
            <table className={styles.user_table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Year Level</th>
                  <th>Course</th>
                  <th>Complaint</th>
                  <th>Medicine</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allStudents.map((students) => (
                  <tr key={students.id}>
                    <td>{students.id}</td>
                    <td>{students.firstName}</td>
                    <td>{students.lastName}</td>
                    <td>{students.year}</td>
                    <td>{students.course}</td>
                    <td>{students.complaint}</td>
                    <td>{students.studentsmed.name}</td>
                    <td>
                      <button
                      className="btn btn-primary m-2"
                        onClick={() =>
                          navigate(`/studentscomplaints/${students.id}`)
                        }
                      >
                        Update
                      </button>
                      <button 
                      className="btn btn-danger m-2"
                      onClick={() => handleDelete(students.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          
        </div>
      </div>
    </>
  );
};
export default StudentsComplaints;
