import React, { useContext, useState, useEffect } from "react";
import audioContext from "../context/audio/audioContext";
import loading from "../loading_audio.gif"
const AudioItem = (props) => {
  const [url, setUrl] = useState("");
  const [isloading, setIsloading] = useState(false);
  const context = useContext(audioContext);
  const { deleteAudio , updateAudio } = context;
  const [audio, setAudio]= useState({ description:""})
  const { ele } = props;
  const onChange=(e)=>{
   console.log("onChange");
    setAudio({...audio,[e.target.name] : e.target.value})
   
}
//  const update=(id, description)=>{
//   console.log(id);
//   console.log(description);
//   console.log(audio.description);
//  }
  const createAudio = async (Aurl) => {
    try {
      setIsloading(true);
      const response = await fetch(Aurl);
      if (response.status === 200) {
        const blob = await response.blob();
        setIsloading(false);
        console.log(blob);
        // const audio = new Audio();
        // audio.controls = true;
        // document.getElementById("cardBody").appendChild(audio);

        setUrl(window.URL.createObjectURL(blob));
      } else {
        setIsloading(false);
        setUrl("");
      }
    } catch (err) {
      setIsloading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    createAudio(ele.url);
    setAudio({description: ele.description});
  }, [ele]);
  useEffect(() => {
    console.log(url);
  }, [url]);
  return (
    
    <div className="card my-3" style={{borderRadius:"10px"}}>
      <div className="card-body d-flex flex-row align-items-center" id="cardBody">
        {!isloading && url && (
          <audio controls>
            <source src={url} type="audio/mpeg" />
          </audio>
        )}
        {isloading && (
          <img src={loading} style={{width:"10vw"}} alt=""/>
        )}

        {console.log("url in audioItem", ele.url)}
        <span className="mx-5 d-none d-sm-block"><span style={{fontWeight:"bold"}}>created on</span>: {ele.createdOn}</span>
        <span className="mx-4 align-items-center d-none d-md-block">{ele.description}</span>
       <span style={{alignItems:"center"}}> <i
         
          className="fa-sharp fa-solid fa-trash mx-2  d-none d-md-block"
          onClick={() => {
            console.log(ele._id);
            deleteAudio(ele._id);
          }}
        ></i>
        </span>
        <a
          href={ele.url}
          style={{color:"black"}}
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-solid fa-download mx-2  d-none d-md-block"></i>
        </a>
       

<i className="fa-solid fa-pen-to-square mx-2  d-none d-md-block" data-bs-toggle="modal" data-bs-target={`#UpdateModal${ele._id}`}></i>

<div className="modal fade" id={`UpdateModal${ele._id}`} tabIndex="-1" aria-labelledby="UpdateModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="UpdateModalLabel">Update your audio</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <label htmlFor="description">Description</label>
      <input onChange={onChange} value={audio.description} type="text" className="form-control my-3" id="description" name='description' />
       
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={()=>{updateAudio(ele._id, audio.description)}}>Save changes</button>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default AudioItem;
