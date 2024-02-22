import React, { useContext } from "react";
import styles from "./Forms.module.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Welcome from "../../Components/Welcome/Welcome";

const Forms = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.wrapper_form}>
            <div className={styles.sm_card} onClick={(()=> navigate('/students'))}>
              <div className={styles.icon}>
                <img src="/student.png" alt="" />
              </div>
              Student Form
            </div>
            <div className={styles.sm_card} onClick={(()=> navigate('/faculties'))}>
            <div className={styles.icon}>
                <img src="/teacher.png" alt="" />
              </div>
              Faculty Form
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
