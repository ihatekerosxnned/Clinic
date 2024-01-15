import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

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
    <form onSubmit={handleSubmit} autoComplete='off'>
        <h6>First Name</h6>
        <input type="text" name='firstName' value={formData.firstName} onChange={handleChange}/>
        <h6>Last Name</h6>
        <input type="text" name='lastName' value={formData.lastName} onChange={handleChange}/>
        <h6>Year</h6>
        <input type="text" name='department' value={formData.department} onChange={handleChange}/>
        <h6>Complaint</h6>
        <textarea name="complaint" value={formData.complaint} onChange={handleChange}></textarea>
        <h6>Medicine</h6>
        <select name="MedicineId" value={formData.MedicineId} onChange={handleChange}>
        <option value="" hidden >Select Medicine</option>
                  {medicines.map((medicines) => (
                    <option key={medicines.id} value={medicines.id}>
                      {medicines.name}
                    </option>
                  ))}
        </select>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default FacultiesComplaintsUpdate