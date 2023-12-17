import React from 'react';
import "./RegisterSection.css";

const RegisterSection = ({firstSectionInfo, secondSectionInfo, thirdSectionInfo}) => {

    return (
        <div className="section__progress">
            <span className={`register__progress ${firstSectionInfo && 'make__progress'}`}></span>
            <span className={`register__progress ${secondSectionInfo && 'make__progress'}`}></span>
            <span className={`register__progress ${thirdSectionInfo && 'make__progress'}`}></span>
        </div>
    )
}

export default RegisterSection