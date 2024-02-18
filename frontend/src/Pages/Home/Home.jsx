import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.lg_card}>
          Available Medicines
          <h1>16</h1>
        </div>
        <div className={styles.lg_card}>
          Total Complaints
          <h1>8</h1>
        </div>
      </div>
      <div className={styles.wrapper_form}>
        <div className={styles.sm_card} onClick={(()=> navigate('/studentcomplaints'))}>
          <div className={styles.icon}>
            <img src="/student.png" alt="" />
          </div>
          Student Complaints
        </div>
        <div className={styles.sm_card} onClick={(()=> navigate('/facultycomplaints'))}>
          <div className={styles.icon}>
            <img src="/teacher.png" alt="" />
          </div>
          Faculty Complaints
        </div>
        <div className={styles.sm_card} onClick={(()=> navigate('/medicines'))}>
          <div className={styles.icon}>
            <img src="/medicine.png" alt="" />
          </div>
          Medicine List
        </div>
      </div>
    </>
  );
};

export default Home;
