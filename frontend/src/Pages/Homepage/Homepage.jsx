import React, { useContext } from "react";
import styles from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Welcome from "../../Components/Welcome/Welcome";
import Home from "../Home/Home"

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.wrapper_form}>
            <Home />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
