import React from 'react'
import { useNavigate } from 'react-router-dom'
import MyNavbar from '../../Components/Navbar/Navbar';

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <MyNavbar />
  )
}

export default Dashboard