import React from 'react'
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/Sidebar/Sidebar';
import DashBoard from './Pages/DashBoard';
import OneLiners from './Pages/OneLiner';
import Category from './Pages/Category';
import Language from './Pages/Language';
import Terminology from './Pages/Terminology';
import ShortAndSimple from './Pages/ShortAndSimple';
import ShortAndSimpleContent from './Pages/ShortAndSimpleContent';
import NumericalTest from './Pages/NumericalTest';
import NumericalTestContent from './Pages/NumericalTestContent.js';
import PractiseTest from './Pages/PractiseTest';
import PractiseTestContent from './Pages/PractiseTestContent'
import ENotes from './Pages/ENotes';
import VideoTutorial from './Pages/VideoTutorial';
import Poster from './Pages/Poster';
import MockTestContent from './Pages/MockTestContent';
import MockTest from './Pages/MockTest';

const CommonRoutes = () => {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/numericaltest/:id' element={<NumericalTestContent/>} />
        <Route path='/one-liners' element={<OneLiners />} />
        <Route path='/category' element={<Category/>} />
        <Route path='/language' element={<Language/>} />
        <Route path='/terminology' element={<Terminology/>} />
        <Route path='/short-and-simple' element={<ShortAndSimple/>} />
        <Route path='/short-and-simple/:id' element={<ShortAndSimpleContent/>} />
        <Route path='/numericaltest' element={<NumericalTest/>} />
        
        <Route path='/practisetest/:id' element={<PractiseTestContent/>} />
        <Route path='/practisetest' element={<PractiseTest/>} />
        <Route path='/enotes' element={<ENotes/>} />
        <Route path='/video' element={<VideoTutorial/>} />
        <Route path='/poster' element={<Poster/>} />
        
        <Route path='/mocktest/:id' element={<MockTestContent/>} />
        <Route path='/mocktest' element={<MockTest/>} />
      
      </Routes>
    </>
  )
}

export default CommonRoutes