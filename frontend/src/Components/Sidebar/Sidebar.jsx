import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import styles from "./Sidebar.module.css";

const Sidebar = ({ className }) => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      role: "",
      status: false,
    });
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`${styles.sidenav} ${className}`}>
      <div className={styles.upper}>
        <div className={styles.logo} onClick={(()=> navigate('/'))}>
          <img src="/LOGOCLINIC.png" alt="" />
        </div>
        <div className={styles.upper_items}>
        <li className={isActive("/") ? styles.active : ""} onClick={() => navigate("/")}>
            <img src="/homeIcon.png" alt="" />
            Home
          </li>
          <li className={isActive("/forms") ? styles.active : ""} onClick={() => navigate("/forms")}>
            <img src="/formsIcon.png" alt="" />
            Forms
          </li>
          <li className={isActive("/medicines") ? styles.active : ""} onClick={() => navigate("/medicines")}>
            <img src="/medicinesIcon.png" alt="" />
            Medicines
          </li>
          <li className={isActive("/staffs") ? styles.active : ""} onClick={() => navigate("/staffs")}>
            <img src="/staffsIcon.png" alt="" />
            Staffs
          </li>
          <li className={isActive("/account") ? styles.active : ""} onClick={() => navigate("/account")}>
            <img src="/accountIcon.png" alt="" />
            Account Settings
          </li>
        </div>
      </div>
      <div className={styles.lower}>
        <div className={styles.upper_items}>
          <li onClick={handleLogout}>
            <img src="/logouticon.png" alt="" />
            Sign Out
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
