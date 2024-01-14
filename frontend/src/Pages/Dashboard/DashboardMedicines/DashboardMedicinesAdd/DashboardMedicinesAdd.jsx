import React, { useEffect, useState } from 'react';
import styles from "./DashboardMedicinesAdd.module.css";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const DashboardMedicinesAdd = () => {
    const [formData, setFormData] = useState({
        name:"",
        quantity: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();      
        try {
          const response = await axios.post("http://localhost:8080/medicines/", formData);
          console.log(response.data);
          console.log("Product Listed")
        } catch (error) {
            console.log(error)
        }
      };
      
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
    
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="text" name='name' value={formData.name} onChange={handleChange}/>
        <input type="number" name='quantity' value={formData.quantity} onChange={handleChange}/>
        <button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default DashboardMedicinesAdd