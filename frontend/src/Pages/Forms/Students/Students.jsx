import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Students.module.css";
import Welcome from "../../../Components/Welcome/Welcome";
import StudentsTable from "../../../Components/Tables/StudentsTable";
import FacultyTable from "../../../Components/Tables/FacultyTable";

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

  const yearOptions = [
    { value: "Grade 1", label: "Grade 1" },
    { value: "Grade 2", label: "Grade 2" },
    { value: "Grade 3", label: "Grade 3" },
    { value: "Grade 4", label: "Grade 4" },
    { value: "Grade 5", label: "Grade 5" },
    { value: "Grade 6", label: "Grade 6" },
    { value: "Grade 7", label: "Grade 7" },
    { value: "Grade 8", label: "Grade 8" },
    { value: "Grade 9", label: "Grade 9" },
    { value: "Grade 10", label: "Grade 10" },
    { value: "Grade 11", label: "Grade 11" },
    { value: "Grade 12", label: "Grade 12" },
    { value: "First Year", label: "First Year (College)" },
    { value: "Second Year", label: "Second Year (College)" },
    { value: "Third Year", label: "Third Year (College)" },
    { value: "Fourth Year", label: "Fourth Year (College)" },
  ];

  const departmentOptions = [
    { value: "SHTM", label: "SHTM" },
    { value: "SBIT", label: "SBIT" },
    { value: "SSLATE", label: "SSLATE" },
    { value: "SARFAID", label: "SARFAID" },
    { value: "SHS", label: "SHS" },
    { value: "IS", label: "IS" },
  ];
  
  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.form_group}>
            <h1>Student Fill Up Form</h1>
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
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className={styles.form_group_div}>
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
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="" hidden>
                      Select Year Level
                    </option>
                    {yearOptions.map((year) => (
                      <option key={year.value} value={year.value}>
                        {year.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.inputs}>
                  <label>Department</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="" hidden>
                      Select Deparment
                    </option>
                    {departmentOptions.map((deparment) => (
                      <option key={deparment.value} value={deparment.value}>
                        {deparment.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.form_group_div}>
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

                  <div className={styles.inputs_button}>
                    <button type="submit" className="button-primary">
                      Submit
                    </button>
                    <button type="reset" className="button-warning">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.form_group}>
            <StudentsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
