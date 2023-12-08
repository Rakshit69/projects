import React from 'react'
// import Article from './components/article/Article'
// import Brand from './components/brand/Brand'
// import Cta from './components/cta/Cta'
// import Feature from './components/Feature/Feature'
// import Navbar from './components/Navbar/Navbar'
import { Article,Brand,Cta, Navbar } from './components'
import { Header, Footer, Features, Possiblility, Blog, WhatGPT3 } from './containers'
import "./app.css"

const App = () => {
  return (
    <div className='App'>
      <div className="Gradient__bg">
       < Navbar/>
       < Header/>
      </div>
       
       < Brand/>
       < WhatGPT3/>
       < Features/>
      < Possiblility />
      < Cta />
      {/* click to action */}
      

      < Blog />
      < Footer/>
      

          
          
    </div>
  )
}

export default App  
