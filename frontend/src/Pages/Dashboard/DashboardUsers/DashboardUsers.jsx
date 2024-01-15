import React, { useEffect, useState } from 'react';
import styles from './DashboardUsers.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../Components/Sidebar/Sidebar';

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

    const getStatusLabel = (status) => {
      switch (status) {
        case 0:
          return 'Admin';
        case 1:
          return 'Nurse';
        case 2:
          return 'Student';
        default:
          return 'Admin';
      }
    };
  return (
   <>
   <Sidebar />
   <div className={styles.container}>
        <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>User List</h1>
          <button onClick={(()=> navigate('/usersadd'))}>Create User</button>
        </div>
          <table className={`table ${styles.user_table}`}>
            <thead>
              
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{getStatusLabel(user.role)}</td>
                  <td>
                    <button
                      className="btn btn-primary m-2"
                      onClick={() =>
                        navigate(`/usersupdate/${user.id}`)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger my-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
   </>
  )
}

export default DashboardUsers
{/* <div>
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
</div> */}