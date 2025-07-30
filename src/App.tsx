import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Components/Pages/Home/Homepage'
import Dashboard from './Components/Dashboard/Dashboard'

const App: React.FC = () => {

  return (
    <>
     <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
     </Routes>
    </>
  )
}

export default App