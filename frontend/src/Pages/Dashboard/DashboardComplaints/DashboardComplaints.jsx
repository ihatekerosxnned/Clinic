import React, { useContext } from "react";
import styles from "./DashboardComplaints.module.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";

const DashboardComplaints = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.wrapper}>
          <div className={styles.card} onClick={() => navigate("/studentscomplaints")}>
            <div className={styles.icon}>
              <img src="/student.png" alt="" />
            </div>
            <div className={styles.text}>Student Complaints</div>
          </div>
          <div className={styles.card} onClick={() => navigate("/facultiescomplaints")}>
            <div className={styles.icon}>
              <img src="/teacher.png" alt="" />
            </div>
            <div className={styles.text}>Faculty Complaints</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardComplaints;
