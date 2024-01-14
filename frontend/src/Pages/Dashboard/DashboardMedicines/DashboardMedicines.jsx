import React, { useEffect, useState } from "react";
import styles from "./DashboardMedicines.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardMedicines = () => {
  const [allMedicines, setallMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/medicines/`).then((response) => {
        setallMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error error imy", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/medicines/${id}`);
      navigate(0)
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <table className={styles.user_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allMedicines.map((medicines) => (
            <tr key={medicines.id}>
              <td>{medicines.id}</td>
              <td>{medicines.name}</td>
              <td>{medicines.quantity}</td>
              <td>
                <button
                  onClick={() => navigate(`/medicinesupdate/${medicines.id}`)}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(medicines.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default DashboardMedicines;
