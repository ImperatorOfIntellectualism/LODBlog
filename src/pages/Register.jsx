import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [inputs, setInputs] = useState({
    userName:'',
    email:'',
    password:''
  })

  const navigate = useNavigate();

  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate('/login')
    } catch (err) {
      setError(err.response.data)
    }
  };

  return (
    <div className='auth'>
        <h1>Register</h1>
        <form>
            <input type="text" placeholder='Login' name='userName' onChange={handleChange}></input>
            <input type="email" placeholder='Email' name='email' onChange={handleChange}></input>
            <input type="password" placeholder='Password' name='password' onChange={handleChange}></input>
            <input type="password" placeholder='Password again'></input>
            <button onClick={handleSubmit}>Sign Up</button>
            {err && <span className='error'>{err}</span>}
            <Link className="registerB" to="/login">Already have an account?</Link>
        </form>
    </div>
  )
}

export default Register