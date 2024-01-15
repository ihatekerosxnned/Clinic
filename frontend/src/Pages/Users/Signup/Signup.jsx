import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
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
      setAlert({ type: "success", message: "Account registered!" });
      setTimeout(() => {
        setAlert(null);
        navigate("/login")
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

  const accountOptions = [
    { value: 1, label: "Nurse" },
    { value: 2, label: "Student" },
  ];
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
            <div className={styles.logo}>
              <img src="/logo.png" />
            </div>
            <div className={styles.inputs}>
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
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputs}>
              <label>What's your role?</label>
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
              <p>
                Already have an account?
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
