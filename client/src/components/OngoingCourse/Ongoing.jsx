import "./Ongoing.css";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Ongoing = () => {

    const [courseProgress] = useState(80);

  return (
    <Link to="/dashboard/courses" className='current__course'>
        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDF8MHwxfHNlYXJjaHwzfHxjb21wdXRlcnxlbnwwfHx8fDE3MDI3NTA0MTJ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Course" loading="lazy"/>
        <div className='course__details'>
            <div className="main__details">
                <h3>Javascript Pro: Mastering Advanced Concepts and Techniques</h3>
                <p>Level Up JS. Covers latest Syntax, design patterns, functional programming.</p>
                <p>By John Doe <span>16 Chapters</span> <span>90 Hours</span> </p>
            </div>
            <div className="progress">
                <div className="progress__bar" >
                    <span style={{ width: `${courseProgress}%` }}></span>
                </div>
                <p>Completed <span>{courseProgress}%</span></p>
            </div>
        </div>
    </Link>
  )
}

export default Ongoing