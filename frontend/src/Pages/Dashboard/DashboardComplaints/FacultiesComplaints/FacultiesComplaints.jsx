import React, { useEffect, useState } from "react";
import styles from "./FacultiesComplaints.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FacultiesCommplaints = () => {
  const [allFaculties, setallFaculties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/students/`).then((response) => {
        setallFaculties(response.data);
      })
      .catch((error) => {
        console.error("Error error imy", error);
      });

  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/students/${id}`);
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
          {allFaculties.map((faculties) => (
            <tr key={faculties.id}>
              <td>{faculties.id}</td>
              <td>{faculties.firstName}</td>
              <td>{faculties.lastName}</td>
              <td>{faculties.department}</td>
              <td>{faculties.complaint}</td>
              <td>{faculties.studentsmed.name}</td>
              <td>
                <button
                  onClick={() => navigate(`/studentscomplaints/${faculties.id}`)}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(faculties.id)}>
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
export default FacultiesCommplaints;
