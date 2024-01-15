import React, { useEffect, useState } from "react";
import styles from "./DashboardMedicinesAdd.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../../Components/Sidebar/Sidebar";

const DashboardMedicinesAdd = () => {
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/medicines/",formData);
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

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Add Medicine</div>
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
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DashboardMedicinesAdd;
