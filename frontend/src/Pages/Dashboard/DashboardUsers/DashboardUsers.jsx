import React, { useEffect, useState } from 'react';
import styles from './DashboardUsers.module.css';
import axios from 'axios';

const DashboardUsers = () => {
    const [allUser, setAllUser] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/users/`).then((response) => {
            setAllUser(response.data);
        }).catch((error) => {
            console.error('Error fetching user by ID:', error);
        });
    }, []);
  return (
    <div>
      {allUser.map((user)=>{
        return(
          <>
          <h1>{user.id}</h1>
          <h1>{user.firstName}</h1>
          <h1>{user.lastName}</h1>
          </>
        );
      })}
    </div>
  )
}

export default DashboardUsers