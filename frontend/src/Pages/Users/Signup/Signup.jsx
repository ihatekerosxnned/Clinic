import React, { useEffect, useState } from 'react';
import styles from './Signup.module.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: 0,
    firstName: "",
    lastName: "",
    image: "",
});

const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();

    const newFormData = new FormData();
    newFormData.append("username", formData.username);
    newFormData.append("password", formData.password);
    newFormData.append("role", formData.role);
    newFormData.append("firstName", formData.firstName);
    newFormData.append("lastName", formData.lastName);
    newFormData.append("image", formData.image);

    try {
        const response = await axios.post("http://localhost:8080/users/", newFormData);
        console.log(response.data);
        // You may also navigate to another page or handle success in a different way
        // navigate("/success");
    } catch (error) {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error);
    }
};

const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
};

const handleFileChange = (event) => {
    // Update image field with the selected file
    setFormData({ ...formData, image: event.target.files[0] });
};

const accountOptions = [
    { value: 1, label: "Nurse" },
    { value: 2, label: "Student" },
];
  return (
    <>
    <form onSubmit={handleSubmit} autoComplete='off'>
      <h6>Username</h6>
        <input type="text" name='username' value={formData.username} onChange={handleChange}/>
        <h6>Password</h6>
        <input type="text" name='password' value={formData.password} onChange={handleChange}/>
        <h6>Role</h6>
        <select name="role" value={formData.role} onChange={handleChange}>
        <option value="" disabled hidden>
                    Account Type
                  </option>
                  {accountOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
        </select>
        <h6>First Name</h6>
        <input type="text" name='firstName' value={formData.firstName} onChange={handleChange}/>
        <h6>Last Name</h6>
        <input type="text" name='lastName' value={formData.lastName} onChange={handleChange}/>
        <h6>Image</h6>
        <input type="file" name="image" onChange={handleFileChange} autoComplete="off" required />
        <button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default Signup