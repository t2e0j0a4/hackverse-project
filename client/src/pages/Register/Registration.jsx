import axios from "axios";
import "./Registration.css";
import Complete from "../../images/Completed.svg";
import React, { useContext, useEffect, useState } from 'react'
import RegisterSection from '../../components/RegisterSections/RegisterSection'
import { useNavigate } from "react-router-dom";

// Context
import { AppContext } from "../../context/AppContext";

const Registration = () => {

  const appContext = useContext(AppContext);
  const {setUserEmailFromRegistration} = appContext;

  const navigate = useNavigate();
  const baseServerURL = 'http://localhost:8000';

  const [completedSections, setCompletedSections] = useState({
    firstSec: false,
    secondSec: false,
    thirdSec: false
  });

  const [pageLoading, setPageLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState('');

  // User Details - Section 1

  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const validateUserDetails = async (e) => {
    e.preventDefault();

    setPageLoading(true);

    const response = await axios.post(`${baseServerURL}/api/v1/student/auth/register`, {
      fullName: userDetails.fullName,
      email: userDetails.email,
      password: userDetails.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const authToken = response.data.token;
    setUserEmailFromRegistration(response.data.user.email);

    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

    setPageLoading(false);

    setCompletedSections({
      ...completedSections, firstSec: true
    });
  }

  // Other Details - Section 2

  const [otherDetails, setOtherDetails] = useState({
    description: '',
    school: '',
    degree: '',
    endDate: '',
    startDate: '',
    fieldOfStudy: '',
  })

  const changeOtherDetails = (e) => {
    setOtherDetails({...otherDetails, [e.target.name]: e.target.value});
  }

  const validateOtherDetails = (e) => {
    e.preventDefault();
    setCompletedSections({
      ...completedSections, secondSec: true
    });
  }

  // Intrests - Section 3

  const [userIntrests, setUserIntrests] = useState([]);
  const [userInputsInText, setUserInputsInText] = useState('');

  useEffect(() => {
    setUserIntrests(() => userInputsInText.split(',').map((item) => item.trim()));
  }, [userInputsInText]);

  const finalRegistrationSubmit = async (e) => {
    e.preventDefault();
    
    setPageLoading(true);

    
    await axios.patch(`${baseServerURL}/api/v1/student/me`, {
      education : otherDetails,
      interests: userIntrests
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    setPageLoading(false);
    setRegisterMessage('Successfully Registered');
    setCompletedSections({...completedSections, thirdSec: true});
    navigate('/dashboard');
  }

  return (
    <main className="app__register">
      <h1>Register</h1>
      <RegisterSection firstSectionInfo={completedSections.firstSec} secondSectionInfo={completedSections.secondSec} thirdSectionInfo={completedSections.thirdSec} />

      {
        (completedSections.secondSec === false && completedSections.firstSec === false && completedSections.thirdSec === false) && (
          <form className="register__section" onSubmit={(e) => {validateUserDetails(e)}}>
            <input required type="text" name="fullName" placeholder="Full Name*" value={userDetails.fullName} onChange={(e) => {setUserDetails({...userDetails, [e.target.name]: e.target.value})}} />      
            <input required type="email" name="email" placeholder="Email*" value={userDetails.email} onChange={(e) => {setUserDetails({...userDetails, [e.target.name]: e.target.value})}} />      
            <input required type="password" name="password" placeholder="Password*" value={userDetails.password} onChange={(e) => {setUserDetails({...userDetails, [e.target.name]: e.target.value})}} />
            <button type="submit">
              {
                pageLoading ? (<span className="loader"></span>) : (
                  <span>Next</span>
                )
              }
            </button>
          </form>
        )
      }

      {
        (completedSections.firstSec && completedSections.secondSec === false) && (
          <form className="register__section" onSubmit={(e) => {validateOtherDetails(e)}}>
            <input name="school" type="text" value={otherDetails.school} onChange={(e) => {changeOtherDetails(e)}}  placeholder="School" />
            <input name="degree" type="text" value={otherDetails.degree} onChange={(e) => {changeOtherDetails(e)}}  placeholder="Degree" />
            <input name="fieldOfStudy" type="text" value={otherDetails.fieldOfStudy} onChange={(e) => {changeOtherDetails(e)}}  placeholder="Field of Study"/>
            <div className="year">
              <input name="startDate" type="text" value={otherDetails.startDate} onChange={(e) => {changeOtherDetails(e)}}  placeholder="Start Year" />
              <input name="endDate" type="text" value={otherDetails.endDate} onChange={(e) => {changeOtherDetails(e)}}  placeholder="End Year" />
            </div>
            <textarea name="description" placeholder="About yourself" value={otherDetails.description} onChange={(e) => {changeOtherDetails(e)}} ></textarea> 
            <button type="submit">
              {
                pageLoading ? (<span class="loader"></span>) : (
                  <span>Next</span>
                )
              }
            </button>
          </form>
        )
      }

      {
        (completedSections.firstSec && completedSections.secondSec) && (
          <form className="user__intrests" onSubmit={(e) => {finalRegistrationSubmit(e)}}>
            <div className='all__intrests'>
              {
                (userIntrests.length > 1) && (
                  userIntrests.map((item, index) => {
                    return <span key={index}>{item}</span>
                  })
                )
              }
            </div>
            <div>
              <input type="text" name="intrests" placeholder="Your Intrests" value={userInputsInText} onChange={(e) => {
                setUserInputsInText(e.target.value);
              }}/>
              <p>Enter comma seperated</p>
            </div>
            <button type="submit">
              {
                pageLoading ? (<span className="loader"></span>) : (
                  <span>Next</span>
                )
              }
            </button>
          </form>
        )
      }

      {
        (completedSections.firstSec && completedSections.secondSec && completedSections.thirdSec && registerMessage !== '') && (
          <div className="confirm__register">
            <div className="confirm__popup">
              <img src={Complete} alt="Successful" />
              <p>Successfully Registered...</p>
            </div>
          </div>
        )
      }
      
    </main>
  )
}

export default Registration