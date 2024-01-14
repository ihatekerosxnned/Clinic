import React from 'react';
import styles from './Homepage.module.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className={styles.container}>
        <div className={styles.wrapper}>
        <div className={styles.card} onClick={(()=> navigate('/forms'))}>
          Complaints
        </div>
        <div className={styles.card}>
          Medicines
        </div>
        <div className={styles.card}>
          Staff
        </div>
        <div className={styles.card}>
          Users
        </div>
        <div className={styles.card}>
          Booking
        </div>
        </div>
    </div>
    </>
  )
}

export default Homepage