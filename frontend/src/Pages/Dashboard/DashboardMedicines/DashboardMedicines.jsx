import React, { useEffect, useState } from 'react';
import styles from './DashboardMedicines.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardMedicines = () => {
    const [allMedicines, setallMedicines] = useState([]);
    const navigate = useNavigate();

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
          <button onClick={(()=> navigate(`/medicinesupdate/${medicines.id}`))}>Update</button>
          </div>
          </>
        );
      })}
    </div>
  )
}

export default DashboardMedicines