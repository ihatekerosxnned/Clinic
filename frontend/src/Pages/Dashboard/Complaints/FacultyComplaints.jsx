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

    axios
      .get(`http://localhost:8080/medicines/`)
      .then((response) => {
        setallMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicines", error);
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
              <button className="button-primary">
                Download XLS
              </button>
            </div>
            <div className={styles.title}>Faculty Complaints</div>
            <FacultyTable/>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyComplaints;
