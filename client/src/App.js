import React from 'react'
import {Routes, Route} from "react-router-dom";

// Pages
import Events from './pages/Events/Events';
import Courses from './pages/Courses/Courses';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Registration from './pages/Register/Registration';
import Dashboard from './pages/Dashboard/Dashboard';
import EachCourse from './pages/Courses/EachCourse/EachCourse';

// Context
import { AppState } from './context/AppContext';

const App = () => {
  return (
    <AppState>
      <main className="app">
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Registration/>} />
          <Route path='/dashboard' element={<Dashboard/>} />

          <Route path='/dashboard/workshops' element={<Events/>} />
          <Route path='/dashboard/courses' element={<Courses/>} />
          <Route path='/dashboard/courses/:courseId' element={<EachCourse/>} />
          <Route path='/dashboard/profile' element={<Profile/>} />
        </Routes>
      </main>
    </AppState>
  )
}

export default App