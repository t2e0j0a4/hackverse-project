import "./Courses.css";
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CourseCard from "../../components/CourseCard/CourseCard";

// React Icons
import { IoSearch } from "react-icons/io5";
import { dummyCourses } from "../../data";

const Dashboard = () => {
  return (
    <main className='app__dashboard'>
      <Sidebar/>
      <div className="dashboard__courses">
        <div className='courses__center'>
          
          {/* Search Box with Title */}

          <section className="search__box">
            <h2>Courses</h2>
            <div className="search" >
              <IoSearch className="search__icon" fontSize={24} />
              <input type="text" placeholder="Search Courses" />
            </div>
          </section>

          {/* Search Box with Title */}

          {/* Showing Courses */}

          <section className="courses__section">
            <h3>Courses we like to Offer</h3>
            <div className="show__courses">
              {
                dummyCourses.map((item) => {
                  return <CourseCard key={item.id} {...item} />
                })
              }
            </div>
          </section>

          {/* Showing Courses */}

        </div>
      </div>
    </main>
  )
}

export default Dashboard;