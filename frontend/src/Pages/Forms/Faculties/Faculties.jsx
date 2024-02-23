import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Faculties.module.css";
import Welcome from "../../../Components/Welcome/Welcome";
import FacultyTable from "../../../Components/Tables/FacultyTable";

const Faculties = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [medicines, setallMedicines] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
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
        "http://localhost:8080/faculties/",
        formData
      );
      setTimeout(() => {
        setAlert({ type: "success", message: "Faculty Form Uploaded!" });
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
            <h1>Personnel Fill Up Form</h1>
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
                  <label>Department</label>
                  <select
                    name="department"
                    value={formData.department}
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
                <div className={styles.inputs_button}>
                  <button type="submit" className="button-primary">
                    Submit
                  </button>
                  <button type="reset" className="button-warning">
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.form_group}>
            <FacultyTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Faculties;