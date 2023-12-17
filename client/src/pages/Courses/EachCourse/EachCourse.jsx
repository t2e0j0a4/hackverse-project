import "./EachCourse.css";
import React from 'react';
import { useParams } from "react-router-dom";

// Components
import Sidebar from '../../../components/Sidebar/Sidebar';

const EachCourse = () => {

    const { courseId } = useParams();

    return (
        <main className='app__dashboard'>
            <Sidebar/>
            <div className="dashboard__course">
                <div className='course__center'>
                    
                    <section className="course__info">
                        <div className="more__details">
                            <p>Web Development</p>
                            <h1>Complete JavaScript Tutorial 2024: Covered ES6 Concepts, Dynamic Programming and more</h1> 
                            <p>The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!</p>
                            <p>Created by <span>John Doe</span></p>
                            <div className="other__cards">
                                <p>Last updated on 11/2023</p>
                                <p>English</p>
                            </div>
                            <div className="money">
                                <p>Free</p>
                                <p>₹4000</p>
                            </div>
                            <button type="button">Enroll Now</button>
                        </div>
                        <img src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDF8MHwxfHNlYXJjaHw5fHxjb2Rpbmd8ZW58MHx8fHwxNzAyNzgyMDE3fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Course" loading="lazy" />
                    </section>

                    <section className="course__includes">
                        <h2>This Course Includes :</h2>
                        <div className="includes">
                            <p>12 Hours of Video</p>
                            <p>12 Coding Exercises</p>
                            <p>Downlodable Articles</p>
                        </div>
                    </section>

                    <section className="course__content">
                        <h2>Course Content :</h2>
                    </section>

                </div>
            </div>
        </main>
    )
}

export default EachCourse;