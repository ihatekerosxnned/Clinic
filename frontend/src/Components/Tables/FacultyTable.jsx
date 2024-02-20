import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FacultyTable = () => {
  const [allFaculties, setallFaculties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/faculties/`)
      .then((response) => {
        setallFaculties(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentFaculties = allFaculties.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <table className={styles.table_group}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>Complaint</th>
            <th>Medicine</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentFaculties.map((faculties) => (
            <tr key={faculties.id}>
              <td>{faculties.firstName}</td>
              <td>{faculties.lastName}</td>
              <td>{faculties.department}</td>
              <td>{faculties.complaint}</td>
              <td>{faculties.facultiesmed.name}</td>
              <td>
                {new Date(faculties.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(allFaculties.length / studentsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
          <button key={pageNumber} className={pageNumber === currentPage ? styles.active : null} onClick={() => paginate(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
};

export default FacultyTable;
