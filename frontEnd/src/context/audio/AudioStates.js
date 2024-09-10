import React, { useState, useEffect } from "react";
import audioContext from "./audioContext";
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
const ffmpeg = new FFmpeg();
const AudioStates = (props) => {
  const host = "http://localhost:8000";
  const audioIntially = [];
  const [audios, setAudios] = useState(audioIntially);
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [isConverting, setIsConverting]= useState(false);
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_OUR_SECRET_API,
    authDomain: "campus-audify.firebaseapp.com",
    projectId: "campus-audify",
    storageBucket: "campus-audify.appspot.com",
    messagingSenderId: "802394273530",
    appId: "1:802394273530:web:a7f9b0a787c3b7ea167b43",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Get a list of cities from your database
  // async function getCities(db) {
  //   const citiesCol = collection(db, "cities");
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map((doc) => doc.data());
  //   return cityList;
  // }
  const fetchAllAudio = async () => {
    setIsConverting(true)
    console.log(isConverting)
    const response = await fetch(`${host}/api/audio/fetchallaudio`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        "auth-token": localStorage.getItem("token"),
      },
    });
    const Json = await response.json();
    setIsConverting(false);
    console.log(isConverting)
    setAudios(Json);
  };
  
  const addAudio = async (video, description, tag) => {
    await ffmpeg.load();
    setIsConverting(true)
    await ffmpeg.writeFile("video1.mp4", await fetchFile(video));
    await ffmpeg.exec([
      "-y",
      "-i", "video1.mp4",
      "-vn",
      "-ar", "44100",
      "-ac", "2",
      "-b:a", "256k",
      "-f", "mp3",
      "out.mp3"
    ]);
    
    // Read the .gif file back from the FFmpeg file system
    const data = await ffmpeg.readFile('out.mp3');
    console.log("audios data", data);
    let url;
    var d = new Date();
    var file = new File(
      [new Blob([data.buffer], { type: "audio/mpeg" })],
      d.valueOf(),
      { type: "audio/mpeg" }
    );

    console.log("file: ", file);
    console.log("time: ", d.getSeconds());
    const storage = getStorage();

    const storageRef = ref(storage, `${description}`.concat(`${d.getTime()}`));

    // 'file' comes from the Blob or File API
    const temp = await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    const anotherTenp = await getDownloadURL(storageRef)
      .then((curl) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", curl);
        xhr.send();

        // Or inserted into an <img> element
        console.log("url:", curl);
        url = curl;
      })
      .catch((error) => {
        // Handle any errors
      });

    const response = await fetch(`${host}/api/audio/addaudio`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",

        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ url, description, tag }),
    });
    const Json = await response.json();
    console.log("Json: ", Json);
    console.log(Json.url);
    setIsConverting(false);
    setAudios(audios.concat(Json));
  };
  const updateAudio = async (id, description) => {
    console.log("id: ", id);
    const response = await fetch(`${host}/api/audio/updateaudio/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({description}),
    });

   let newAudio= [...audios];
    const Json = await response.json();
    console.log("Json: ", Json);
    console.log(Json.url);
    for(let i=0; i< newAudio.length; i++){
    if(newAudio[i]._id===id){
      newAudio[i].description= description;
    }
    }
 
    setAudios(newAudio);
    // let newAudio = audios.filter((audio) => {
    //   console.log(audio._id);
    //   console.log(id);
    //   return audio._id !== id;
    // });
    // console.log(newAudio);
    // newAudio=newAudio.concat(Json);
    // console.log(newAudio);
    // setAudios(newAudio);
    
    
    // setAudios(audios.concat(Json));
  };

  const deleteAudio = async (id) => {
    console.log("id: ", id);
    const response = await fetch(`${host}/api/audio/deleteaudio/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    let newAudio = audios.filter((audio) => {
      return audio._id !== id;
    });
    setAudios(newAudio);
  };

  return (
    <audioContext.Provider
      value={{
        audios,
        setVideo,
        video,
        addAudio,
        
        fetchAllAudio,
        deleteAudio,
        updateAudio,
      }}
    >
      {props.children}
    </audioContext.Provider>
  );
};

export default AudioStates;
