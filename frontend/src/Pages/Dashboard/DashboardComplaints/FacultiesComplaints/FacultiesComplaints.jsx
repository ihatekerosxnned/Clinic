import React, { useEffect, useState } from "react";
import styles from "./FacultiesComplaints.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FacultiesCommplaints = () => {
  const [allFaculties, setallFaculties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/faculties/`).then((response) => {
        setallFaculties(response.data);
      })
      .catch((error) => {
        console.error("Error error imy", error);
      });

  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/faculties/${id}`);
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>Complaint</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allFaculties.map((faculties) => (
            <tr key={faculties.id}>
              <td>{faculties.firstName}</td>
              <td>{faculties.lastName}</td>
              <td>{faculties.department}</td>
              <td>{faculties.complaint}</td>
              <td>{faculties.facultiesmed.name}</td>
              <td>
                <button
                  onClick={() => navigate(`/facultiescomplaints/${faculties.id}`)}
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
