import React, { useEffect, useState } from 'react';
import styles from './DashboardUsers.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardUsers = () => {
    const [allUser, setAllUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/users/`).then((response) => {
            setAllUser(response.data);
        }).catch((error) => {
            console.error('Error fetching user by ID:', error);
        });
    }, []);

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/users/${id}`);
        console.log('User deleted successfully');
        navigate(0)
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }; 
  return (
    <div>
    <table className={styles.user_table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {allUser.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>
              <button onClick={() => navigate(`/usersupdate/${user.id}`)}>Update</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default DashboardUsers