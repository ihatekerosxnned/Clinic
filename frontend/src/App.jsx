import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import Signup from "./Pages/Users/Signup/Signup";
import Update from "./Pages/Users/Signup/Update";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardMedicinesAdd from "./Pages/Dashboard/DashboardMedicines/DashboardMedicinesAdd/DashboardMedicinesAdd";
import DashboardUsers from "./Pages/Dashboard/DashboardUsers/DashboardUsers";
import DashboardMedicines from "./Pages/Dashboard/DashboardMedicines/DashboardMedicines";
import Homepage from "./Pages/Homepage/Homepage";
import DashboardUsersUpdate from "./Pages/Dashboard/DashboardUsers/DashboardUsersUpdate/DashboardUsersUpdate";
import DashboardMedicinesUpdate from "./Pages/Dashboard/DashboardMedicines/DashboardMedicinesUpdate/DashboardMedicinesUpdate";
import DashboardUsersAdd from "./Pages/Dashboard/DashboardUsers/DashboardUsersAdd/DashboardUsersAdd";
import Students from './Pages/Forms/Students/Students'
import Forms from './Pages/Forms/Forms'
import Faculties from "./Pages/Forms/Faculties/Faculties";
import StudentsComplaints from "./Pages/Dashboard/DashboardComplaints/StudentsComplaints/StudentsComplaints";
import StudentsComplaintsUpdate from "./Pages/Dashboard/DashboardComplaints/StudentsComplaints/StudentsComplaintsUpdate/StudentsComplaintsUpdate";
import FacultiesCommplaints from "./Pages/Dashboard/DashboardComplaints/FacultiesComplaints/FacultiesComplaints";

import FacultiesComplaintsUpdate from "./Pages/Dashboard/DashboardComplaints/FacultiesComplaints/FacultiesComplaintsUpdate/FacultiesComplaintsUpdate"
import Login from "./Pages/Users/Login/Login";

// AUTH CONTEXT 
import { AuthContext } from "./Helpers/AuthContext";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    role: "",
    status: false,
  });
  
  useEffect(() => {
    // Check if there is an access token in local storage
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // No access token, set authState accordingly
      setAuthState({
        ...authState,
        status: false,
      });
      return;
    }
  
    // Fetch user information from the server
    axios.get("http://localhost:8080/users/auth", {
      headers: {
        accessToken: accessToken,
      },
    })
    .then((response) => {
      if (response.data.error) {
        // If there is an error, set authState accordingly
        setAuthState({
          ...authState,
          status: false,
        });
      } else {
        // If successful, update authState with user information
        setAuthState({
          id: response.data.id,
          username: response.data.username,
          role: response.data.role,
          status: true,
        });
      }
    })
    .catch((error) => {
      console.error("An unexpected error occurred:", error);
      // Handle other types of errors (network issues, server down, etc.)
    });
  }, []);
  return (
    <>
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Routes>
      {authState.status ? (
        <>
        {/* <Route path="/" exact element={<Signup />} /> */}
        <Route path="/" exact element={<Homepage />} />
      
        {/* DASHBOARD MEDICINES */}
        
        <Route path="/medicines" exact element={<DashboardMedicines />} />
        <Route path="/medicinesadd" exact element={<DashboardMedicinesAdd />} />
        <Route path="/medicinesupdate/:id" exact element={<DashboardMedicinesUpdate />} />
         
        {/* USER FUNCTIONS LODS */}
        <Route path="/users" exact element={<DashboardUsers />} />
        <Route path="/usersadd" exact element={<DashboardUsersAdd />} />
        <Route path="/usersupdate/:id" exact element={<DashboardUsersUpdate />} />

        {/* FACULTIES AND STUDENTS ROUTESADH ASD */}
        
        <Route path="/forms" exact element={<Forms />} />
        <Route path="/students" exact element={<Students />} />
        <Route path="/faculties" exact element={<Faculties />} />
        
        {/* LIST FOR STUDENTS AND FACULTIES COMPLAINTS  */}
        <Route path="/studentscomplaints" exact element={<StudentsComplaints />} />
        <Route path="/facultiescomplaints" exact element={<FacultiesCommplaints />} />
        <Route path="/studentscomplaints/:id" exact element={<StudentsComplaintsUpdate />} />
        <Route path="/facultiescomplaints/:id" exact element={ <FacultiesComplaintsUpdate />  } />
        </>

      ) : (
        <Route path="/" exact element={<Navigate replace to="/login"/>} />
      )}
        

        {/* LOGIN SIGNUP */}
        
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
      </AuthContext.Provider>
      
    </>
  );
}

export default App;
