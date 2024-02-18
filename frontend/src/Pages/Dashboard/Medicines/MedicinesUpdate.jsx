import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Medicines.module.css";
import Welcome from "../../../Components/Welcome/Welcome";

const MedicinesUpdate = () => {
  const [alert, setAlert] = useState(null);
  const { id } = useParams();
  const [medicine, setMedicine] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/medicines/view/${id}`)
      .then((response) => {
        setMedicine(response.data);
        setFormData({
          name: response.data.name,
          quantity: response.data.quantity.toString(),
        });
      })
      .catch((error) => {
        console.error("Error fetching user by ID:", error);
      });
  }, [id]);

  // UPDAWETE FUNCTIONS ARA SA DALOM LODS
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/medicines/update/${id}`, formData);
      setTimeout(() => {
        setAlert(null);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }, 1000);
    } catch (error) {
      console.error("Error updating user:", error);
      setAlert({ type: "danger", message: "Error adding medicine" });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.form_group}>
            <h1>Update Medicine</h1>
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
                  />
                  <button type="submit" className="button-primary">
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="button-warning"
                    onClick={() => navigate(0)}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicinesUpdate;
