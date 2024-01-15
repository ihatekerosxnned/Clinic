import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      first_name: "",
      last_name: "",
      id: 0,
      account_role: "",
      status: false,
    });
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="" />
          </div>
          <ul>
            <li>Forms</li>
            <li>Medicines</li>
            <li>Staff</li>
            <li>Accounts</li>
          </ul>
        </div>
        <button onClick={(()=> handleLogout())}>Logout</button>
      </div>
    </>
  );
};

export default Sidebar;
