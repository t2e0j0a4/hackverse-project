import "./Dashboard.css";
import React from 'react';

// Data
import { dummyCourses, dummyWorkshops } from "../../data";

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import Ongoing from "../../components/OngoingCourse/Ongoing";
import CourseCard from "../../components/CourseCard/CourseCard";
import EventCard from "../../components/EventsCard/EventCard";

const Dashboard = () => {

  return (
    <main className='app__dashboard'>
      <Sidebar/>
      <div className="dashboard__home">
        <div className='home__center'>

          {/* Ongoing Course */}

          <section className="ongoing__course">
            <h2>Ongoing Course</h2>
            <Ongoing/>
          </section>

          {/* Ongoing Course */}
          
          {/* Recommended Courses */}
          
          <section className="courses">
            <h2>Recommended Courses</h2>
            <div className="all__courses">
              {
                dummyCourses.map((item) => {
                  return <CourseCard key={item.id} {...item} />
                })
              }
            </div>
          </section>

          {/* Recommended Courses */}

          {/* Recommended Events */}
          
          <section className="workshops">
            <h2>Recommended Workshops</h2>
            <div className="all__workshops">
              {
                dummyWorkshops.map((item) => {
                  return <EventCard key={item.id} {...item} />
                })
              }
            </div>
          </section>

          {/* Recommended Events */}

        </div>
      </div>
    </main>
  )
}

export default Dashboard