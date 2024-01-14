import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const DashboardMedicinesUpdate = () => {
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
      console.log('User updated successfully');
      navigate(0);
      // Optionally, you can redirect or update your UI after a successful update
  } catch (error) {
      console.error('Error updating user:', error);
      // Handle the error, update your UI, or show a notification
  }
};

const accountOptions = [
  { value: 1, label: "Nurse" },
  { value: 2, label: "Student" },
];

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update User</h1>
      <input type="text" name='name' value={formData.name} onChange={handleChange} />
      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
      <button>Submit</button>
    </form>
  )
}

export default DashboardMedicinesUpdate