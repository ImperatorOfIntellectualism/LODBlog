import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'

const Profile = () => {
  const [user,setUser] = useState()
  useEffect(() => {
    const fetchData = () => {
      try {
        setUser(JSON.parse(localStorage.getItem('user')));
      } catch (err) {
        console.log("error");
      }
    };
    fetchData();
    console.log(user?.id)
  }, [user?.id]);
  
  const uploadImage = (img, id) => {
    const imgid = id + "avatar"
    const formData = new FormData()
    formData.append('file', img)
    formData.append('upload_preset', 'bejitabrobtw')
    formData.append('public_id', imgid)
    axios.post('https://api.cloudinary.com/v1_1/imperatorofintellectualism/image/upload', formData).then((response)=>{console.log(response)})
  }

  return (
    <div className='bodyProfile'>
        <span className='label'>                                                  Profile page</span>
        <div className='profileData'>
            <div className='avatar'>
              <input type="file" onChange={(e)=>{uploadImage(e.target.files[0], user.id)}}>
                </input>
                <img className='avatar' src={`https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1672561802/LODBlog/${user?.id}avatar.jpg`} alt="" />
            </div>
            <div className='data'>
              {user?.userName}
            </div>
        </div>
    </div>
  )
}

export default Profile