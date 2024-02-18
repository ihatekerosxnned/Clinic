import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import Signup from "./Pages/Users/Signup/Signup";
import Homepage from "./Pages/Homepage/Homepage";
import Login from "./Pages/Users/Login/Login";
import Forms from "./Pages/Forms/Forms";
import Students from "./Pages/Forms/Students/Students";
import Faculties from "./Pages/Forms/Faculties/Faculties";
import StudentComplaints from "./Pages/Dashboard/Complaints/StudentComplaints";
import FacultyComplaints from "./Pages/Dashboard/Complaints/FacultyComplaints";

// AUTH CONTEXT
import { AuthContext } from "./Helpers/AuthContext";
import Medicines from "./Pages/Dashboard/Medicines/Medicines";
import MedicinesAdd from "./Pages/Dashboard/Medicines/MedicinesAdd";
import MedicinesUpdate from "./Pages/Dashboard/Medicines/MedicinesUpdate";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    role: "",
    status: false,
    loading: true, // Add loading state
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        if (!accessToken) {
          setAuthState({
            ...authState,
            status: false,
            loading: false,
          });
          return;
        }

        const response = await axios.get("http://localhost:8080/users/auth", {
          headers: {
            accessToken: accessToken,
          },
        });

        if (response.data.error) {
          setAuthState({
            ...authState,
            status: false,
            loading: false,
          });
        } else {
          setAuthState({
            id: response.data.id,
            username: response.data.username,
            role: response.data.role,
            status: true,
            loading: false,
          });
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        setAuthState({
          ...authState,
          status: false,
          loading: false,
        });
      }
    };

    checkAuthentication();
  }, [authState]); // Include authState as a dependency

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        {authState.loading ? (
          // You can add a loading spinner or message here
          <div>Loading...</div>
        ) : (
          <Routes>
            {authState.status ? (
              <>
                <Route path="/" element={<Homepage />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/students" element={<Students />} />
                <Route path="/faculties" element={<Faculties />} />
                <Route
                  path="/facultycomplaints"
                  element={<FacultyComplaints />}
                />
                <Route
                  path="/studentcomplaints"
                  element={<StudentComplaints />}
                />
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/medicinesadd" element={<MedicinesAdd />} />
                <Route path="/medicinesupdate/:id" element={<MedicinesUpdate />} />
                
                
              </>
            ) : (
              <Route path="/" element={<Navigate replace to="/login" />} />
            )}

            {/* LOGIN SIGNUP */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
