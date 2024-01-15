import React, { useEffect, useState } from "react";
import styles from "./FacultiesComplaints.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../../Components/Sidebar/Sidebar";

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
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Faculty Complaints</div>
            <table className={styles.user_table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Year Level</th>
                  <th>Course</th>
                  <th>Complaint</th>
                  <th>Actions</th>
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
                    <td>{faculties.facultiesmed.name}</td>
                    <td>
                      <button
                      className="btn btn-primary m-2"
                        onClick={() =>
                          navigate(`/facultiescomplaints/${faculties.id}`)
                        }
                      >
                        Update
                      </button>
                      <button 
                      className="btn btn-danger m-2"
                      onClick={() => handleDelete(faculties.id)}>
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
export default FacultiesCommplaints;
