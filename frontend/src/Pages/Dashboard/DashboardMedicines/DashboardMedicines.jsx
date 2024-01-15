import React, { useEffect, useState } from "react";
import styles from "./DashboardMedicines.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";

const DashboardMedicines = () => {
  const [allMedicines, setallMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/medicines/`)
      .then((response) => {
        setallMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error error imy", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/medicines/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
    <Sidebar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>Medicine List</h1>
          <button onClick={(()=> navigate('/medicinesadd'))}>Add Medicine</button>
        </div>
          <table className={`table ${styles.user_table}`}>
            <thead>
              
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Action</th>
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
                      className="btn btn-primary m-2"
                      onClick={() =>
                        navigate(`/medicinesupdate/${medicines.id}`)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger my-2"
                      onClick={() => handleDelete(medicines.id)}
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
  );
};
export default DashboardMedicines;
