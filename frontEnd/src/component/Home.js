import React from 'react'
import Audio from './Audio'
import AddAudio from './AddAudio'

const Home = (props) => {
    
  return (
    <div className='container-fluid Page' style={{color:"white" }}>
    <div className='row'>
    <AddAudio showAlert={props.showAlert}/>
   <Audio showAlert={props.showAlert}/>
    </div>
   
    </div>
  )
}

export default Home

