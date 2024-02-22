import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/",
        formData
      );
      setAlert({ type: "success", message: "Account registered!" });
      setTimeout(() => {
        setAlert(null);
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);
      console.log(error);
      setAlert({ type: "danger", message: error.response.data.message });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.clinic_img}>
            <img src="/clinicimg.jpg" />
          </div>
        </div>
        <div className={styles.right}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.logo}>
              <img src="/LOGOCLINIC.png" />
            </div>
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
            <h3>LCC-B Clinic Registration</h3>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputs}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputs}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputs}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputs}>
              <button type="submit" className="button-primary">Submit</button>
              <p>
                Already have an account?{" "}
                <Link className={styles.sign} to="/login">
                  Log in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
