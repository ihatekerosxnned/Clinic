import React,{useState, useEffect} from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Home = () => {
  const navigate = useNavigate();
  const [medicineCount, setAllMedCount] = useState([])
  const [facultyCount, setAllFacCount] = useState([])
  const [studentCount, setAllStudCount] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/medicines/medCount").then((response)=>{setAllMedCount(response.data.count);
    }).catch((error)=>{console.log(error)
    });
    axios.get("http://localhost:8080/faculties/facCount").then((response)=>{setAllFacCount(response.data.count);
    }).catch((error)=>{console.log(error)
    });
    axios.get("http://localhost:8080/students/studCount").then((response)=>{setAllStudCount(response.data.count);
    }).catch((error)=>{console.log(error)
    });
  }, []);

  const total_complaint = facultyCount + studentCount;
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_count}>
        <div className={styles.lg_card}>
          Available Medicines
          <h1>
          {medicineCount}</h1>
        </div>
        <div className={styles.lg_card}>
          Total Complaints
          <h1>{total_complaint}</h1>
        </div>
        </div>
      </div>
      <div className={styles.wrapper_form}>
        <div className={styles.sm_card} onClick={(()=> navigate('/studentcomplaints'))}>
          <div className={styles.icon}>
            <img src="/student.png" alt="" />
          </div>
          Student Complaints
        </div>
        <div className={styles.sm_card} onClick={(()=> navigate('/facultycomplaints'))}>
          <div className={styles.icon}>
            <img src="/teacher.png" alt="" />
          </div>
          Faculty Complaints
        </div>
        <div className={styles.sm_card} onClick={(()=> navigate('/medicines'))}>
          <div className={styles.icon}>
            <img src="/medicine.png" alt="" />
          </div>
          Medicine List
        </div>
      </div>
    </>
  );
};

export default Home;
