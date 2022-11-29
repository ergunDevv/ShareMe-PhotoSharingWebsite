import React , { useEffect }from 'react'
import {json, useNavigate} from "react-router-dom"
import {FcGoogle} from "react-icons/fc"
import shareVideo from "../assets/share.mp4"
import logo from "../assets/logowhite.png"
import {GoogleLogin , googleLogout} from "@react-oauth/google" 
import {client} from "../client.js"
import jwt_decode from 'jwt-decode'


function Login() {
  

  
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const decoded=jwt_decode(response.credential);
    
    localStorage.setItem("user", JSON.stringify(decoded));
    const { name, aud, picture } = decoded;
    const doc = {
      _id: aud,
      _type: "user",
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  
     
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
        src={shareVideo}
        muted
        autoPlay
        className='w-full h-full object-cover'
        loop
        controls={false}
        type="video/mp4"
        
        />
      </div>
      <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
        <div className='p-5'>
            <img src={logo} width="130px" alt="logo" />
        </div>
        <div className='shadow-2xl'>
            <GoogleLogin
            onSuccess={(response) => {
              responseGoogle(response)
            }}
            onError={() => {
              console.log('Login Failed');
            }} />
        </div>
      </div>

    </div>
  )
}

export default Login