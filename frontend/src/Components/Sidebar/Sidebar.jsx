import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          <div className={styles.logo} onClick={() => navigate("/")}>
            <img src="/LOGOCLINIC.png" alt="" />
          </div>
          <ul>
            <li onClick={() => navigate("/forms")}>
              <img src="/form1.png" class="icon" /> <Link>Forms</Link>
            </li>
            <li onClick={() => navigate("/complaints")}>
              <img src="/comp1.png" class="icon" /> <Link>Complaints</Link>
            </li>

            {authState.role === 0 ||
              (authState.role === 1 && (
                <>
                  <li onClick={() => navigate("/medicines")}>
                    <img src="/med.png" class="icon" />
                    <Link>Medicines</Link>
                  </li>
                  <li onClick={() => navigate("/users")}>
                    <img src="/acc1.png" class="icon" /> <Link>Accounts</Link>
                  </li>
                </>
              ))}
          </ul>
        </div>

        <div className={styles.logout}>
          <ul>
            <li onClick={() => handleLogout()}>
              <img src="/logouticon.png" class="icon" />
              <Link>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
