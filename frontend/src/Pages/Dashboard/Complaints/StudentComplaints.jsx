import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Complaints.module.css";
import Welcome from "../../../Components/Welcome/Welcome";
import StudentsTable from "../../../Components/Tables/StudentsTable";

const StudentComplaints = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [allStudents, setAllStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    year: "",
    course: "",
    complaint: "",
    MedicineId: "",
  }); 

  useEffect(() => {
    axios
      .get(`http://localhost:8080/students/`)
      .then((response) => {
        setAllStudents(response.data);
      })
      .catch((error) => {
        console.error("Error error imy", error);
      });
  }, []);

  const downloadFacultyTableAsExcel = () => {
    const header = ['First Name', 'Last Name', 'Year', 'Course',  'Complaint', 'Medicine', 'Date'];
    const rows = allStudents.map(student => [
      student.firstName,
      student.lastName,
      student.year,
      student.course,
      student.complaint,
      student.studentsmed.name,
      new Date(student.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    ]);
    
    const csvContent = header.join(',') + '\n' + rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const today = new Date();
    const fileName = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} - Student_Complaints.csv`;

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
            <div className={styles.title}>Student Complaints</div>
            <StudentsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentComplaints;
