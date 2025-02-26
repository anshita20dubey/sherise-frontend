import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import AllEnablers from './components/AllEnablers';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allenablers" element={<AllEnablers />} />
    </Routes>
  )
}

export default App