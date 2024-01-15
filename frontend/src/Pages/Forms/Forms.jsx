import React,{useContext} from 'react'
import styles from "./Forms.module.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Helpers/AuthContext';

const Forms = () => {
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
        <h1>Logout</h1>
        </div>
    </div>
    </>
  )
}

export default Forms