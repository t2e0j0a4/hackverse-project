import axios from "axios";
import "./Login.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const baseServerUrl = "http://localhost:8000";

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  })

  const [loading, setloading] = useState(false);

  const validateLoginForm = async (e) => {
    e.preventDefault();

    setloading(true);
    const response = await axios.post(`${baseServerUrl}/api/v1/student/auth/login`, loginDetails, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const token = response.data.accessToken;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setloading(false);
    navigate('/dashboard');

  }

  return (
    <main className="app__login">
      <h1>Login</h1>
      <form className="login__form" onSubmit={(e) => {validateLoginForm(e)}}>
        <input type="email" name="email" value={loginDetails.email} onChange={(e) => {
          setLoginDetails({...loginDetails, [e.target.name]: e.target.value});
        }} placeholder="Email" />
        <input type="password" name="password" value={loginDetails.password} onChange={(e) => {
          setLoginDetails({...loginDetails, [e.target.name]: e.target.value});
        }} placeholder="Password" />
        <button type="submit">
          {
            loading ? (<span className="loader"></span>) : (
              <span>Login</span>
            )
          }
        </button>
      </form>
      <p>New User? <Link to={"/register"}>Register</Link></p>
    </main>
  )
}

export default Login