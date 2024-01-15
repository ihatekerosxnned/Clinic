import React, { useEffect, useState } from "react";
import styles from "./DashboardUsersAdd.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../../Components/Sidebar/Sidebar";

const DashboardUsersAdd = () => {
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/",
        formData
      );
      setTimeout(() => {
        setAlert(null);
        setTimeout(() => {
          navigate(0);
        }, 1000);
      }, 1000);
    } catch (error) {
      setAlert({ type: "danger", message: "Error creating user" });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const accountOptions = [
    { value: 1, label: "Nurse" },
    { value: 2, label: "Student" },
  ];
  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Create New User</div>
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
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputs}>
              <label>Password</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputs}>
              <select name="role" value={formData.role} onChange={handleChange}>
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

export default DashboardUsersAdd;
