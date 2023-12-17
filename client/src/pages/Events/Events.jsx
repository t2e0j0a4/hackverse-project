import "./Events.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Sidebar from '../../components/Sidebar/Sidebar';
import EventCard from "../../components/EventsCard/EventCard";
import { formatDate } from "../../utils";

const Dashboard = () => {

  const [allEvents, setAllEvents] = useState([]);

  const fetchAllEvents = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/public/event/all`);
    setAllEvents(response.data.events);
  }

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <main className='app__dashboard'>
      <Sidebar/>
      <div className="dashboard__events">
        <div className='events__center'>
          
          <h1>Events</h1>

          <div className="all__events">
            {
              allEvents.map((eve) => {
                return <EventCard key={eve.id} workshopDesc={eve.description} workshopTitle={eve.title} id={eve._id} workshopImage={eve.imageUrl} workshopDate={formatDate(eve.date)} mentorName={eve.organizer.name} />
              })
            }
          </div>

        </div>
      </div>
    </main>
  )
}

export default Dashboard