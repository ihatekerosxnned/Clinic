import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [medicineCount, setAllMedCount] = useState([]);
  const [facultyCount, setAllFacCount] = useState([]);
  const [studentCount, setAllStudCount] = useState([]);
  const [allFaculty, setallFaculties] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/medicines/medCount")
      .then((response) => {
        setAllMedCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:8080/faculties/facCount")
      .then((response) => {
        setAllFacCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:8080/students/studCount")
      .then((response) => {
        setAllStudCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });

    // USE EFFECT PARA SA ACTIVITY
    axios
      .get(`http://localhost:8080/students/`)
      .then((response) => {
        setallFaculties(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const recentActivity = allFaculty.slice(0, 2);
  const total_complaint = facultyCount + studentCount;
  return (
    <>
    <div className={styles.wrapper_form}>
        <div className={styles.sm_card} onClick={() => navigate("/studentcomplaints")}
        >
          <div className={styles.icon}>
            <img src="/student.png" alt="" />
          </div>
          Student Complaints
        </div>
        <div className={styles.sm_card}onClick={() => navigate("/facultycomplaints")}>
          <div className={styles.icon}>
            <img src="/teacher.png" alt="" />
          </div>
          Personnel Complaints
        </div>
        <div className={styles.sm_card} onClick={() => navigate("/medicines")}>
          <div className={styles.icon}>
            <img src="/medicine.png" alt="" />
          </div>
          Medicine List
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_count}>
          <div className={styles.left}>
            <h3>Total</h3>
            <div className={styles.content}>
              <div className={styles.lg_card}>
                Medicines
                <h3>{medicineCount}</h3>
              </div>
              <div className={styles.lg_card}>
                Complaints
                <h3>{total_complaint}</h3>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <h3>Recent Activty</h3>
            <div className={styles.right_content}>
              {recentActivity.map((faculties) => (
                <>
                  <div className={styles.content_wrapper} key={faculties.id}>
                    <h5>{new Date(faculties.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</h5>
                    <h6>
                      Name : <span>{faculties.firstName} {faculties.lastName}</span>
                    </h6>
                    <p>Year / Course : <span>{faculties.year} {faculties.course}</span></p>
                    <p>Complaint : <span>{faculties.complaint}</span></p>
                    <p>Medicine : <span>{faculties.studentsmed.name}</span></p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ANG SA DALOM NADI EH TRY TA NADI CSS AH HEHEHE */}
      
    </>
  );
};

export default Home;
