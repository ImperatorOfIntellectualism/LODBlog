import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Menu = () => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  useEffect( () => {
    const fetchData = async ()=>{
      try {
         const res = await axios.get(`/posts`)
         console.log(res)
         if (res.length > 4) res.length = 4;
         setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1672561802/LODBlog/${post.img}.jpg`} alt="error" />
          </div>
          <div className="content">
            <Link className="link" to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <button onClick={() => {navigate(`/post/${post.id}`)}}>Read More</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Menu