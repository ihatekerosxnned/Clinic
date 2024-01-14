import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const DashboardUsersUpdate = () => {
  const {id} = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
});

useEffect(() => {
    axios.get(`http://localhost:8080/users/view/${id}`).then((response) => {
        setUser(response.data);
            setFormData({
                username: response.data.username,
                password: response.data.password,
                role: response.data.role.toString(),
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
      await axios.put(`http://localhost:8080/users/update/${id}`, formData);
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
      <input type="text" name='username' value={formData.username} onChange={handleChange} />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="" hidden >Account Type</option>
                  {accountOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
        </select>
      <button>Submit</button>
    </form>
  )
}

export default DashboardUsersUpdate