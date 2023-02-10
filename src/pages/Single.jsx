import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);

      } catch (err) {
        console.log("error");
      }
    };
    fetchData();
    console.log(post)
  }, []);

  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1672561802/LODBlog/${post.img}.jpg`} alt="" />
        <div className="user">
          {post.img != undefined && <img
            src={`https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1672561802/LODBlog/${post.img}avatar.jpg`}
            alt=""
          />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.userName === post.username && (
    <div className="edit">
      <Link to={`/write?edit=${postId}`} state={post}>
        <img src='https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1672733644/LODBlog/edit_jsz9qx.png' alt="" />
      </Link>
      <img onClick={handleDelete} src='https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1672733643/LODBlog/delete_sp3okb.png' alt="" />
    </div>
  )}
        </div>
        <h1 style={{marginTop: "0px"}}>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
 </div>
      <Menu cat={post.cat}/>
    </div>
  );
};
export default Single;