import Signup from "./Pages/Users/Signup/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
import Update from "./Pages/Users/Signup/Update";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardMedicinesAdd from "./Pages/Dashboard/DashboardMedicines/DashboardMedicinesAdd/DashboardMedicinesAdd";
import DashboardUsers from "./Pages/Dashboard/DashboardUsers/DashboardUsers";
import DashboardMedicines from "./Pages/Dashboard/DashboardMedicines/DashboardMedicines";
import Homepage from "./Pages/Homepage/Homepage";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" exact element={<Signup />} /> */}
        <Route path="/" exact element={<Homepage />} />
        
        
        
        {/* DASHBOARD MEDICINES */}
        
        <Route path="/medicines" exact element={<DashboardMedicines />} />
        <Route path="/medicinesadd" exact element={<DashboardMedicinesAdd />} />
        {/* <Route path="/update/:id" exact element={<Update />} /> */}
        
        {/* USER FUNCTIONS LODS */}
        <Route path="/users" exact element={<DashboardUsers />} />
        
        
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
      
    </>
  );
}

export default App;
