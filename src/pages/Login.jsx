import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    userName:'',
    password:''
  })

  const navigate = useNavigate();

  const {login} = useContext(AuthContext)

  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/")
    } catch (err) {
      setError(err.response.data)
    }
  };

  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
            <input type="text" placeholder='Login' name='userName' onChange={handleChange}></input>
            <input type="password" placeholder='Password' name='password' onChange={handleChange}></input>
            <button onClick={handleSubmit}>Log In</button>
            {err && <span className='error'>{err}</span>}
            <Link className="registerB" to="/register">Don't have an account?</Link>
        </form>
    </div>
  )
}

export default Login