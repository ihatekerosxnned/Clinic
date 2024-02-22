import React, { useState, useEffect, useContext } from 'react';
import styles from "./Welcome.module.css";
import { AuthContext } from "../../Helpers/AuthContext";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation

const Welcome = () => {
  const [formattedDateTime, setFormattedDateTime] = useState(getFormattedDateTime);
  const { authState, setAuthState } = useContext(AuthContext);
  const location = useLocation(); // Get current location

  function getFormattedDateTime() {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedDateTime(getFormattedDateTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate();

  return (
    <div className={styles.profile}>
      
        <div className={styles.back} onClick={(()=> navigate(-1))}> {location.pathname !== "/" && (<> <img src="/backIcon.png" alt="" />Back</>)}</div>
      
      <div>
        <h6>Hello, {authState.firstName} {authState.lastName}</h6>
        <p>{formattedDateTime}</p>
      </div>
    </div>
  );
}

export default Welcome;
