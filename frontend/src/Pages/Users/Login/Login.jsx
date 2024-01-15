import React,{useContext, useState} from 'react';
import styles from './Login.module.css';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";

// AuthContext
import { AuthContext } from '../../../Helpers/AuthContext';

const Login = () => {
  // FOR NAVIGATION AND LOCATION
  const navigate = useNavigate();
  const location = useLocation();

  //
  const {authState, setAuthState} = useContext(AuthContext);

  // FODA GO FORM KAG ALERT IHIHI
  const [formData, setFormData] = useState({
    username: "",
    password:""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8080/users/login", formData);
  
      if (response.data.error) {
        console.log(response.data.error)
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          id: response.data.id,
          username: response.data.username,
          role: response.data.role,
          status: true,
        });
  
        // Log information after successful login
        console.log("Data stored in localStorage:", response.data);
  
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
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
        <div className={styles.wrapper}>
          <div className={styles.form_group}>
            <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
              <div className={styles.form_input}>
                <input type="text" name='username' onChange={handleChange} value={formData.username} autoComplete='off'/>
                <label>Username</label>
              </div>
              <div className={styles.form_input}>
                <input type="password" name='password' onChange={handleChange} value={formData.password}/>
                <label>Password</label>
              </div>
              <button className={styles.button_custom}>Login</button>
              <p>Don't have an account? <Link to='/signup'>Sign Up Here</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;