import React,{useContext} from 'react'
import styles from "./Forms.module.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Helpers/AuthContext';

const Forms = () => {
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
        <div className={styles.card} onClick={(()=> navigate('/students'))}>
          Student
        </div>
        <div className={styles.card} onClick={(()=> navigate('/faculties'))}>
          Faculty
        </div>
        <h1 onClick={handleLogout}>Logout</h1>
        </div>
    </div>
    </>
  )
}

export default Forms