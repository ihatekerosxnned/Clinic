import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Complaints.module.css";
import Welcome from "../../../Components/Welcome/Welcome";
import FacultyTable from "../../../Components/Tables/FacultyTable";

const FacultyComplaints = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [medicines, setallMedicines] = useState([]);
  const [allFaculties, setallFaculties] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/faculties/`)
      .then((response) => {
        setallFaculties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching faculties", error);
      });
  }, []);

  const downloadFacultyTableAsExcel = () => {
    const header = ['First Name', 'Last Name', 'Department', 'Complaint', 'Medicine', 'Date'];
    const rows = allFaculties.map(faculty => [
      faculty.firstName,
      faculty.lastName,
      faculty.department,
      faculty.complaint,
      faculty.facultiesmed.name,
      new Date(faculty.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    ]);
    const csvContent = header.join(',') + '\n' + rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const today = new Date();
    const fileName = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} - Faculty_Complaints.csv`;

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.form_group}>
            <div className={styles.button_container}>
              <button className="button-primary" onClick={downloadFacultyTableAsExcel}>Download Excel</button>
            </div>
            <div className={styles.title}>Faculty Complaints</div>
            <FacultyTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyComplaints;
