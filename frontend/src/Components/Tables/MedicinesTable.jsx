import React, { useEffect, useState, forwardRef } from "react";
import styles from "./Table.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MedicinesTable = forwardRef((props, ref) => {
  const [allFaculties, setallFaculties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/medicines/`)
      .then((response) => {
        setallFaculties(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentFaculties = allFaculties.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/medicines/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <table className={styles.table_group} ref={ref}>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Date Uploaded</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {currentFaculties.map((faculties) => (
            <tr key={faculties.id}>
              <td>{faculties.name}</td>
              <td>{faculties.quantity}</td>
              <td>{new Date(faculties.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</td>
              <td>
              {new Date(faculties.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              {/* <td>
                <button className="button-primary" onClick={() => navigate(`/medicinesupdate/${faculties.id}`)
                      }>Update</button>
                <button className="button-warning" onClick={() => handleDelete(faculties.id)}>Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(allFaculties.length / studentsPerPage) },
          (_, index) => index + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? styles.active : null}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
});

export default MedicinesTable;
