import React, {useContext, useState} from 'react'
import audioContext from '../context/audio/audioContext'
const AddAudio = (props) => {
    const context= useContext(audioContext)
    const {addAudio, setVideo, video, addAudioByUrl}= context;
   const [videoUrl, setVideoUrl]= useState("");
    const [audio, setAudio]= useState({ description:"", tag:"default"})
    const addAudioByinput=(event)=>{
       event.preventDefault();
       if(audio.description.length<5){
        alert("please provide a valid description");
        return 
      }
      // if(videoUrl!==""){
      //  addAudioByUrl(videoUrl,audio.description);
      //  setVideoUrl("");
      //  setAudio({ description:" ", tag:"default"})
      //  return;
      // }
      if(video===undefined){
        alert("please select a file or give url id")
          return 
      }
     
     addAudio(video, audio.description, audio.tag);
     props.showAlert("Successfully converted", "success")
     setAudio({ description:" ", tag:"default"});

     document.getElementById("video").value="";
    }
   const onChange=(e)=>{
   
        setAudio({...audio,[e.target.name] : e.target.value})
   }
   const onChangeFile=(e)=>{
    setVideo(e.target.files?.item(0));
   }
   const onChangeUrl =(e)=>{
     setVideoUrl(e.target.value);
   }
  return (
    <>
      <div className='p-4 col-12 col-md-6 ' >
    <form onSubmit={addAudioByinput}>
    <div className="form-group" >
      {/* <label htmlFor="title">Email address</label> */}
      {/* <input onChange={onChangeUrl} type="text" className="form-control my-3" name="url" value={videoUrl} placeholder='put the id of youtube video'></input> */}
     {/* <div className='d-flex flex-row align-items-center'> <hr style={{width:"47vw"}} /> <span className='mx-1'>Or</span><hr style={{width:"47vw"}} /></div> */}
      <input style={{borderRadius:"10px"}} onChange={onChangeFile} type="file" className="form-control my-3" id="video" name="video"  placeholder="Enter file" />
      
    </div>
    <div className="form-group d-md-none">
      {/* <label htmlFor="description">Description</label> */}
      <input style={{borderRadius:"10px"}} onKeyDown={(e)=> e.preventDefault()}  onChange={onChange} value={audio.description} type="text" className="form-control my-3" id="description" name='description'  placeholder='Description' />  
    </div>
    <button  type="submit" className="btn btn-dark btn-custom">Convert</button>
  </form> 
  </div>
    <div className='p-4 d-none d-md-block col-md-6' >
    <form onSubmit={addAudioByinput}>
    <div className="form-group">
      {/* <label htmlFor="description">Description</label> */}
      <input style={{borderRadius:"10px"}}  onChange={onChange} value={audio.description} type="text" className="form-control my-3" id="description" name='description'  placeholder='Description' />  
    </div>
   
  </form> 
  </div>
  </>
  )
}

export default AddAudio
