import React, { useState } from 'react'
import './Advertisement.css'
import SimpleLoader from '../SimpleLoader/SimpleLoader'

const Advertisement = () => {
  const [ready, setReady]  =useState(false)
  return (
    <>
    <div className="adv-container">
     <iframe onLoad={()=>setReady(true)} className='adv-editor' style={{display:`${ready? "block":"none"}`}} src="https://canva-editor-three.vercel.app/" frameborder="0">
     </iframe>
     </div>
    { ready ? "" : <div style={{display:'grid',placeContent:'center'}}><SimpleLoader/></div>}

    </>
  )
}

export default Advertisement