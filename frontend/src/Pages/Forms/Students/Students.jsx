import React,{useState, useEffect} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Students = () => {
  const navigate = useNavigate();
  const [medicines, setallMedicines] = useState([])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    year: "",
    course: "",
    complaint: "",
    MedicineId: "",
});

useEffect(() => {
  axios.get(`http://localhost:8080/medicines/`).then((response) => {
      setallMedicines(response.data);
    })
    .catch((error) => {
      console.error("Error error imy", error);
    });
}, []);


const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    try {
        const response = await axios.post("http://localhost:8080/students/", formData);
    } catch (error) {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error);
    }
};

const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
};

  return (
    <>
    <form onSubmit={handleSubmit} autoComplete='off'>
        <h6>First Name</h6>
        <input type="text" name='firstName' value={formData.firstName} onChange={handleChange}/>
        <h6>Last Name</h6>
        <input type="text" name='lastName' value={formData.lastName} onChange={handleChange}/>
        <h6>Year</h6>
        <input type="text" name='year' value={formData.year} onChange={handleChange}/>
        <h6>Course</h6>
        <input type="text" name='course' value={formData.course} onChange={handleChange}/>
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
    </>
  )
}

export default Students