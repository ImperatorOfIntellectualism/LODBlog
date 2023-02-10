import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
  const state = useLocation().state;
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const uid = JSON.parse(localStorage.getItem('user')).id
    const [cat, setCat] = useState('art');
    const [id, setId] = useState()
    const [imgPost, setImg] = useState()
    useEffect( () => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/posts/lid`);
          if (id == undefined){setId(res.data.lastid + 1);}
        } catch (err) {
          console.log("error");
        }
      };
      fetchData();
    }, [id])
    
    const uploadImage = (img, id) => {
      const formData = new FormData()
      formData.append('file', img)
      formData.append('upload_preset', 'bejitabrobtw')
      formData.append('public_id', id)
      axios.post('https://api.cloudinary.com/v1_1/imperatorofintellectualism/image/upload', formData).then((response)=>{console.log(response)})
    }

      const navigate = useNavigate();
    
      const [err, setError] = useState(null);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(!!state)
        try {
          if(state != null) {await axios.put(`/posts/${state.id}`, {desc: desc, title: title, cat: cat})} 
          else {uploadImage(imgPost, id); await axios.post(`/posts`, {desc: desc, title: title, img: id, uid: uid, cat: cat});}
          navigate('/')
        } catch (err) {
          setError(err.response.data)
        }
      };

  return (
    <div className='write'>
        <div className="content">
            <input type="text" placeholder='Title' onChange={e => setTitle(e.target.value)} />
            <div className="editorContainer">
            <ReactQuill theme="snow" placeholder="Write your post here" onChange={setDesc} />;
            </div>
        </div>
        <div className="menu">
            <div className="item">
                <h1>Publish</h1>
                <span>
                    <b>Status: </b> Draft
                </span>
                <span>
                    <b>Visibility: </b> Public
                </span>
                <div className="buttons">
                <input type="file" id="file" name={id} placeholder="Upload Image" onChange={(e)=>{
                  setImg(e.target.files[0])
                }}>
                </input>
                    <button onClick={handleSubmit}>Post</button>
                </div>
            </div>
            <div className="item">
                <h1>Category</h1>
                <div className='cat'>
                <input type='radio' name="cat" value="art" id="art" onChange={e => setCat(e.target.value)}></input>
                <label htmlFor='art'>Art</label>
                </div>
                <div className='cat'>
                <input type='radio' name="cat" value="Science" id="Science" onChange={e => setCat(e.target.value)}></input>
                <label htmlFor='Science'>Science</label>
                </div>
                <div className='cat'>
                <input type='radio' name="cat" value="Technology" id="Technology" onChange={e => setCat(e.target.value)}></input>
                <label htmlFor='Technology'>Technology</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Write
