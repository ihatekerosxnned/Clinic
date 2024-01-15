import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../../Components/Sidebar/Sidebar";
import styles from "./DashboardUsersUpdate.module.css";

const DashboardUsersUpdate = () => {
  const [alert, setAlert] = useState(null);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/view/${id}`)
      .then((response) => {
        setUser(response.data);
        setFormData({
          username: response.data.username,
          password: response.data.password,
          role: response.data.role.toString(),
        });
      })
      .catch((error) => {
        console.error("Error fetching user by ID:", error);
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
      setTimeout(() => {
        setAlert(null);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }, 1000);
      // Optionally, you can redirect or update your UI after a successful update
    } catch (error) {
      setAlert({ type: "danger", message: "Error updating user" });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  const accountOptions = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Nurse" },
    { value: 2, label: "Student" },
  ];

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Update Medicine</div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.inputs}>
              {alert && (
                <div
                  className={`alert alert-${alert.type} alert-dismissible fade show`}
                  role="alert"
                >
                  {alert.message}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
            </div>
            <div className={styles.inputs}>
              <label>Medicine Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputs}>
              <label>Quantity</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" hidden>
                  Account Type
                </option>
                {accountOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DashboardUsersUpdate;

{
  /* <form onSubmit={handleSubmit}>
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
    </form> */
}
