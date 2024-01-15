import Signup from "./Pages/Users/Signup/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
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

function App() {
  return (
    <>
      <Routes>
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
        
        
        

        {/* LOGIN SIGNUP */}
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
      
    </>
  );
}

export default App;
