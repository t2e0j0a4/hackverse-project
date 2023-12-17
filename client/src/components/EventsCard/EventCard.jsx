import { Link } from "react-router-dom";
import "./EventCard.css";
import React from 'react';

const EventCard = ({ id, workshopTitle, workshopDesc, workshopImage, workshopDate, mentorName }) => {
  return (
    <div className="each__event">
        <img src={workshopImage} alt={workshopTitle} loading="lazy" />
        <h3>{workshopTitle.length < 28 ? workshopTitle : workshopTitle.slice(0,28) + '...'}</h3>
        <p>{workshopDesc.length < 64 ? workshopDesc : workshopDesc.slice(0,64) + '...'}</p>
        <div className="others">
            <p>By {mentorName}</p>
            <p>{workshopDate}</p>
        </div>
        <Link to={`/dashboard/events/${id}`}>Register</Link>
    </div>
  )
}

export default EventCard