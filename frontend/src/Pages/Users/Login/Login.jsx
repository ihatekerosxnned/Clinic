import React, { useContext, useState } from "react";
import styles from "../Login/Login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// AuthContext
import { AuthContext } from "../../../Helpers/AuthContext";

const Login = () => {
  // FOR NAVIGATION AND LOCATION
  const navigate = useNavigate();
  const location = useLocation();
  const [alert, setAlert] = useState("");
  //
  const { authState, setAuthState } = useContext(AuthContext);

  // FODA GO FORM KAG ALERT IHIHI
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        formData
      );

      if (response.data.error) {
        console.log(response.data.error);
        setAlert("Sorry, we couldn't find an account with that credentials.");
        setTimeout(() => {
          setAlert(null);
        }, 1500);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          id: response.data.id,
          username: response.data.username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          status: true,
        });

        // Log information after successful login
        console.log("Data stored in localStorage:", response.data);

        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
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
                <div className="alert alert-danger" role="alert">
                  {alert}
                </div>
              )}
            </div>
            <div className={styles.inputs}>
            <h3>LCC-B Clinic Login</h3>
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                autoComplete="off"
              />
            </div>
            <div className={styles.inputs}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                autoComplete="off"
              />
              <button className="button-primary">Login</button>
              <p>
                Don't have an account?{" "}
                <Link className={styles.sign} to="/signup">Sign up here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
