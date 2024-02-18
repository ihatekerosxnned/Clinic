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
  const [medicines, setallMedicines] = useState([]);
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
      .get(`http://localhost:8080/medicines/`)
      .then((response) => {
        setallMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error error imy", error);
      });
  }, []);

  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.form_group}>
            <div className={styles.button_container}>
              <button className="button-primary">Download XLS</button>
            </div>
            <div className={styles.title}>Faculty Complaints</div>
            <StudentsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentComplaints;
