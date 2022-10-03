import React from 'react'
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
import DashBoard from './Pages/DashBoard';
import OneLiners from './Pages/OneLiner';

const CommonRoutes = () => {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/one-liners' element={<OneLiners />} />
      </Routes>
    </>
  )
}

export default CommonRoutes