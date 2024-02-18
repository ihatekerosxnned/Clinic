import React, { useState, useEffect, useContext } from 'react';
import styles from "./Welcome.module.css"
import { AuthContext } from "../../Helpers/AuthContext";

const Welcome = () => {
  const [formattedDateTime, setFormattedDateTime] = useState(getFormattedDateTime);

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
  const {authState, setAuthState} = useContext(AuthContext);

  return (
    <div className={styles.profile}>
      <h6>Hello, {authState.username}</h6>
      <p>{formattedDateTime}</p>
    </div>
  )
}

export default Welcome;
