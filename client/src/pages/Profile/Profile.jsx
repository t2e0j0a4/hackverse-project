import "./Profile.css";
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <main className='app__dashboard'>
      <Sidebar/>
      <div className="dashboard__profile">
        <div className='profile__center'>
          Profile
        </div>
      </div>
    </main>
  )
}

export default Dashboard