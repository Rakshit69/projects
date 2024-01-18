import React from 'react'
import './feature.css'

const Feature = ({title, text}) => {
  return (
    <div className='gpt3__features-container-feature'>
      <div className="gpt3__features-container_feature-title">
        <div />
        <h1>{title}</h1>
        {/* we randered the text */}
        
      </div>
      <div className="gpt3__features-container_feature-text">
       <p>{text}</p> 
      </div>
   </div>
  )
}

export default Feature