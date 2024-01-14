import React, { useEffect, useState } from 'react';
import styles from './DashboardMedicines.module.css';
import axios from 'axios';

const DashboardMedicines = () => {
    const [allMedicines, setallMedicines] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/medicines/`).then((response) => {
            setallMedicines(response.data);
        }).catch((error) => {
            console.error('Error error imy', error);
        });
    }, []);
  return (
    <div>
      {allMedicines.map((medicines)=>{
        return(
          <>
          <div key={medicines.id}>
          <h1>{medicines.name}</h1>
          <h1>{medicines.quantity}</h1>
          <h1>{medicines.user.firstName}</h1>
          <h1>{medicines.user.lastName}</h1>
          </div>
          </>
        );
      })}
    </div>
  )
}

export default DashboardMedicines