import React, { useState, useEffect, useContext } from "react";
import styles from "./Settings.module.css";
import axios from "axios";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Welcome from "../../../Components/Welcome/Welcome";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Helpers/AuthContext";

const Settings = () => {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const id = authState.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/view/${id}`)
      .then((response) => {
        setUser(response.data);
        setFormData({
          username: response.data.username,
          password: response.data.password,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
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
          navigate(0);
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

  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.form_group}>
            <h1>Account Settings</h1>
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
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className={styles.form_group_div}>
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
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputs}>
                  <button type="submit" className="button-primary">
                    Submit
                  </button>
                </div>
              </div>
              <div className={styles.form_group_div}>
                <div className={styles.inputs}>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputs}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <div className={styles.inputs_button}>
                    <button type="reset" className="button-warning">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
