import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Sidebar from '../../../../../Components/Sidebar/Sidebar';
import styles from "./FacultiesComplaintsUpdate.module.css"

const FacultiesComplaintsUpdate = () => {
  const {id} = useParams();
  const [faculty, setFaculty] = useState([]);
  const [medicines, setallMedicines] = useState([])
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    complaint: '',
    MedicineId: '',
});

// DISPLAYING OF DATA SANG ID SANG USER
useEffect(() => {
    axios.get(`http://localhost:8080/faculties/view/${id}`).then((response) => {
      setFaculty(response.data);
            setFormData({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                department: response.data.department,
                complaint: response.data.complaint,
                MedicineId: response.data.MedicineId.toString()
            });
    }).catch((error) => {
        console.error('Error fetching user by ID:', error);
    });

    // DROPDOWN PARA SA MEDICINES LIST NI
    axios.get(`http://localhost:8080/medicines/`).then((response) => {
      setallMedicines(response.data);
    })
    .catch((error) => {
      console.error("Error error imy", error);
    });

}, [id]);

// UPDAWETE FUNCTIONS ARA SA DALOM LODS
const handleChange = (event) => {
  setFormData({ ...formData, [event.target.name]: event.target.value });
};

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
      await axios.put(`http://localhost:8080/faculties/update/${id}`, formData);
      console.log('Student complaint updated');
      navigate(0);
  } catch (error) {
      console.error('Error updating student:', error);
  }
};

  return (
    <>
    <Sidebar />
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          Faculty Complaint Updates
        </div>
        <form onSubmit={handleSubmit} autoComplete='off'>
        <div className={styles.inputs}>
        <label>First Name</label>
        <input type="text" name='firstName' value={formData.firstName} onChange={handleChange}/>
        </div>
        <div className={styles.inputs}>
        <label>Last Name</label>
        <input type="text" name='lastName' value={formData.lastName} onChange={handleChange}/>
        </div>
        <div className={styles.inputs}>
        <label>Department</label>
        <input type="text" name='department' value={formData.department} onChange={handleChange}/>
        </div>
        <div className={styles.inputs}>
        <label>Complaint</label>
        <textarea name="complaint" value={formData.complaint} onChange={handleChange}></textarea>
        </div>
        <div className={styles.inputs}>
        <label>Medicine</label>
        <select name="MedicineId" value={formData.MedicineId} onChange={handleChange}>
        <option value="" hidden >Select Medicine</option>
                  {medicines.map((medicines) => (
                    <option key={medicines.id} value={medicines.id}>
                      {medicines.name}
                    </option>
                  ))}
        </select>
        <button type='submit'>Submit</button>
        </div>
    </form>
      </div>
    </div>
    </>
  )
}

export default FacultiesComplaintsUpdate