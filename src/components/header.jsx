import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Header = () => {
  const navigate = useNavigate()
  const {currentUser, logout} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to='/'>
          <img src='https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1672733521/LODBlog/logo_bfgjwn.png' alt="error"></img>
          </Link>
        </div>
        <div className="links">
          <Link to="/?cat=art" className='link'><h6>ART</h6></Link>
          <Link to="/?cat=science" className='link'><h6>SCIENCE</h6></Link>
          <Link to="/?cat=technology" className='link'><h6>TECHNOLOGY</h6></Link>
          <span onClick={()=>{navigate('/profile')}}>{currentUser?.userName}</span>
          {currentUser ? <span onClick={()=>{logout(); navigate('/')}}>Logout</span> : <Link to="/login">Sign In</Link>}
          {currentUser ? <span className='writeB'>
            <Link className="link" to="/write">Write</Link>
          </span> : null}
        </div>
      </div>
    </div>
  )
}

export default Header