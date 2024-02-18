import React from "react";
import styles from "./Homepage.module.css";
import { Route, useNavigate, Routes } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Welcome from "../../Components/Welcome/Welcome";
import Home from "../Home/Home";
import Forms from "../Forms/Forms";

const Homepage = () => {
  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <Home />
        </div>
      </div>
    </>
  );
};

export default Homepage;
