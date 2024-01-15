import React, { useContext } from "react";
import styles from "./Forms.module.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Forms = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.wrapper}>
          <div className={styles.card} onClick={() => navigate("/students")}>
            <div className={styles.icon}>
              <img src="/student.png" alt="" />
            </div>
            <div className={styles.text}>Student</div>
          </div>
          <div className={styles.card} onClick={() => navigate("/faculties")}>
            <div className={styles.icon}>
              <img src="/teacher.png" alt="" />
            </div>
            <div className={styles.text}>Faculty</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
