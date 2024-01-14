import React from 'react'
import styles from "./Forms.module.css";
import { useNavigate } from 'react-router-dom';

const Forms = () => {
  const navigate = useNavigate();
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
        </div>
    </div>
    </>
  )
}

export default Forms