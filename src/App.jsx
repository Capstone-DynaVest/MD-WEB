import { useState, useEffect } from 'react'
import Fetch from './component/fetch'
import './App.css'
import './index.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'



 const App = () => {
  return (
     <>
     
   <Navbar />
     <Fetch />
     <Footer />
    
     
     
     </>

  
  )
 }
  


export default App
