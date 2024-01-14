import React, { useEffect, useState } from 'react';
import styles from './Signup.module.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: 0,
});

const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/users/", formData);
    } catch (error) {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error);
    }
};

const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
        <option value="" hidden >Account Type</option>
                  {accountOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
        </select>
        <button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default Signup