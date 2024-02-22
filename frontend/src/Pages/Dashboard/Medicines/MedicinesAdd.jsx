import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Medicines.module.css";
import Welcome from "../../../Components/Welcome/Welcome";
import MedicinesTable from "../../../Components/Tables/MedicinesTable";

const MedicinesAdd = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [medicines, setallMedicines] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/medicines/", formData);
      setAlert({ type: "success", message: "Medicine uploaded!" });

      setTimeout(() => {
        setAlert(null);
        setTimeout(() => {
          navigate(0);
        }, 1000);
      }, 1000);
    } catch (error) {
      setAlert({ type: "danger", message: "Error adding medicine" });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

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
  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.form_group}>
            <h1>Add Medicine</h1>
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
                  <label>Medicine Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputs}>
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit" className="button-primary">Submit</button>
                  <button type="reset" className="button-warning" onClick={(()=> navigate(0))}>Reset</button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.form_group}>
            <MedicinesTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicinesAdd;
