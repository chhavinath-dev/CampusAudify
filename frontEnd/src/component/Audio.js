import React, { useContext, useEffect }  from 'react'
import audioContext from '../context/audio/audioContext'
import AudioItem from './AudioItem';
import loading from "../loading.gif"
import { Link } from 'react-router-dom';
const Audio = () => {
    const context= useContext(audioContext)
    const {audios, setAudios, fetchAllAudio, isConverting}= context;
    useEffect(()=>{
      if(localStorage.getItem("token")){
      fetchAllAudio();}
	  else if(localStorage.getItem("guest_name")){
        if(sessionStorage.getItem("audios")) setAudios(JSON.parse(sessionStorage.getItem("audios")));
	  }
      else{
       document.getElementById("toLogin").click();
      }
    },[])
  return (
    <div className='p-4'>
    <span className='buttonAudio'>Hey {localStorage.getItem("name")? localStorage.getItem("name"): localStorage.getItem("guest_name")}</span>
    <hr/>
    <p style={{fontSize:"22px"}}>Here are your converted audios</p>
    {isConverting && (<div className="w-100" style={{ textAlign : 'center'}}> <img style={{width:"35vw"}} src={loading} alt="" /></div>)}
    {audios.map((ele, index)=>{
        return <AudioItem key={index} ele={ele} />
        })}
     <Link id='toLogin' to="/Login"></Link>   
  </div>
  )
}

export default Audio
