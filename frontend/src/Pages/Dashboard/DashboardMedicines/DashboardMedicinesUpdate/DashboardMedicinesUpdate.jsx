import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Sidebar from "../../../../Components/Sidebar/Sidebar";
import styles from "./DashboardMedicinesUpdate.module.css";

const DashboardMedicinesUpdate = () => {
  const [alert, setAlert] = useState(null);
  const {id} = useParams();
  const [medicine, setMedicine] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
});

useEffect(() => {
    axios.get(`http://localhost:8080/medicines/view/${id}`).then((response) => {
      setMedicine(response.data);
            setFormData({
                name: response.data.name,
                quantity: response.data.quantity.toString()
            });
    }).catch((error) => {
        console.error('Error fetching user by ID:', error);
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
      console.error('Error updating user:', error);
      setAlert({ type: "danger", message: "Error adding medicine" });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
  }
};

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Update Medicine</div>
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
              <input type="text" name='name' value={formData.name} onChange={handleChange} required/>
            </div>
            <div className={styles.inputs}>
              <label>Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default DashboardMedicinesUpdate