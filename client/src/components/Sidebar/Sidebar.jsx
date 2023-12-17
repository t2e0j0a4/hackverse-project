import React from 'react';
import "./Sidebar.css";

import { Link, useLocation } from 'react-router-dom';
import { MdEvent } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const Sidebar = () => {

  const location = useLocation();

  return (
    <aside className='dashboard__sidebar'>
      <nav className='sidebar__nav'>

        <div className='nav__menu'>
          <Link className={`${location.pathname === '/dashboard' && 'active__page'}`} to="/dashboard"><MdDashboard fontSize={21} /><span>Dashboard</span></Link>
          <Link className={`${(location.pathname === '/dashboard/courses' || location.pathname.includes('/dashboard/courses')) && 'active__page'}`} to="/dashboard/courses"><SiBookstack fontSize={21} /><span>Courses</span></Link>
          <Link className={`${(location.pathname === '/dashboard/workshops' || location.pathname.includes('/dashboard/workshops')) && 'active__page'}`} to="/dashboard/workshops"><MdEvent fontSize={21} /><span>Workshops</span></Link>
          <Link className={`${location.pathname === '/dashboard/profile' && 'active__page'}`} to="/dashboard/profile"><FaRegUserCircle fontSize={21} /><span>Profile</span></Link>
        </div>

      </nav>
    </aside>
  )
}

export default Sidebar