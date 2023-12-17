import React from 'react'
import "./CourseCard.css";
import { Link } from 'react-router-dom';

const CourseCard = ({id, courseImage, courseName, review, courseCreatedBy, totalReview}) => {
  return (
    <Link to={`/dashboard/courses/${id}`} className='course__card'>
        <img src={courseImage} alt={courseName} loading='lazy' />
        <h3>{courseName}</h3>
        <p>{courseCreatedBy}</p>
        <div className='course__review'>
            <p>{review} of 5</p>
            <p>({`${totalReview}`})</p>
        </div>
    </Link>
  )
}

export default CourseCard