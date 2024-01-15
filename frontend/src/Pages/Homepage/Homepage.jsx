import React from "react";
import styles from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.wrapper}>
          <div className={styles.card} onClick={() => navigate("/forms")}>
            <div className={styles.icon}>
              <img src="/form.png" alt="" />
            </div>
            <div className={styles.text}>forms</div>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <img src="/medicine.png" alt="" />
            </div>
            <div className={styles.text}>medicines</div>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <img src="/staff.png" alt="" />
            </div>
            <div className={styles.text}>staffs</div>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <img src="/account.png" alt="" />
            </div>
            <div className={styles.text}>accounts</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
