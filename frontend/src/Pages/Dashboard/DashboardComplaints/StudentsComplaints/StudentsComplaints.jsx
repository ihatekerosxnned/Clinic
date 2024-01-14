import React, { useEffect, useState } from "react";
import styles from "./StudentComplaints.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentsComplaints = () => {
  const [allStudents, setallStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/students/`).then((response) => {
        setallStudents(response.data);
      })
      .catch((error) => {
        console.error("Error error imy", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/medicines/${id}`);
      navigate(0)
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <table className={styles.user_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th></th>
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
              <td>{students.medicine.name}</td>
              <td>
                <button
                  onClick={() => navigate(`/medicinesupdate/${medicines.id}`)}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(medicines.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default StudentsComplaints;
