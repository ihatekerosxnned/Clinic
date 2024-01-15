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
      id: 0,
      role: "",
      status: false,
    });
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logo} onClick={(()=> navigate('/'))}>
            <img src="/logo.png" alt="" />
          </div>
          <ul>
            <li onClick={(()=>navigate('/forms'))}>Forms</li>
            <li onClick={(()=>navigate('/medicines'))}>Medicines</li>
            <li onClick={(()=>navigate('/'))}>Staff</li>
            <li onClick={(()=>navigate('/forms'))}>Accounts</li>
          </ul>
        </div>
        <button onClick={(()=> handleLogout())}>Logout</button>
      </div>
    </>
  );
};

export default Sidebar;
