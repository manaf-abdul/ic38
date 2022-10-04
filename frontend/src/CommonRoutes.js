import React from 'react'
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
import DashBoard from './Pages/DashBoard';
import OneLiners from './Pages/OneLiner';
import Category from './Pages/Category';
import Language from './Pages/Language';
import Terminology from './Pages/Terminology';

const CommonRoutes = () => {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/one-liners' element={<OneLiners />} />
        <Route path='/category' element={<Category/>} />
        <Route path='/language' element={<Language/>} />
        <Route path='/terminology' element={<Terminology/>} />
      </Routes>
    </>
  )
}

export default CommonRoutes