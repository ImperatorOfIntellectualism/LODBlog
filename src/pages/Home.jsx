import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DOMPurify from "dompurify";

const Home = () => {
  const [posts,setPosts] = useState([])
  const navigate = useNavigate()
  const cat = useLocation().search

  useEffect( () => {
    const fetchData = async ()=>{
      try {
         const res = await axios.get(`/posts${cat}`)
         setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [cat])
  
  return (
    <div className="home">
    <div className="posts">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1672561802/LODBlog/${post.img}.jpg`} alt="error" />
          </div>
          <div className="content">
            <Link className="link" to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
            <button onClick={() => {navigate(`/post/${post.id}`)}}>Read More</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Home