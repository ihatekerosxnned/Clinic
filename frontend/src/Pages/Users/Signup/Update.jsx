import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const Update = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
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
  return (
    <>
    <div>
        <h1>{user.username}</h1>
        <h1>{user.password}</h1>
        <h1>{user.role}</h1>

        <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Role:
                    <input
                        type="number"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Update User</button>
            </form>
    </div>
    </>
  )
}

export default Update