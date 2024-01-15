import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Students.module.css";

const Students = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [medicines, setallMedicines] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    year: "",
    course: "",
    complaint: "",
    MedicineId: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/medicines/`)
      .then((response) => {
        setallMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error error imy", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/students/",
        formData
      );
      setTimeout(() => {
        setAlert({ type: "success", message: "Student Form Uploaded!" });
        setTimeout(() => {
          navigate(0);
        }, 1000);
      }, 1000);
    } catch (error) {
      setAlert({ type: "danger", message: "Error creating user" });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Fill Up Form</div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.inputs}>
              {alert && (
                <div
                  className={`alert alert-${alert.type} alert-dismissible fade show`}
                  role="alert"
                >
                  {alert.message}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
            </div>
            <div className={styles.inputs}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputs}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputs}>
              <label>Year Level</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputs}>
              <label>Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputs}>
              <label>Complaints</label>
              <textarea
                name="complaint"
                value={formData.complaint}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className={styles.inputs}>
              <label>Select Medicine</label>
              <select
                name="MedicineId"
                value={formData.MedicineId}
                onChange={handleChange}
                required
              >
                <option value="" hidden>
                  Select Medicine
                </option>
                {medicines.map((medicines) => (
                  <option key={medicines.id} value={medicines.id}>
                    {medicines.name}
                  </option>
                ))}
              </select>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Students;
