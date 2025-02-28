import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import AllEnablers from './components/AllEnablers';
import MemberLogin from './pages/MemberLogin';
import MemberShip from './pages/MemberShip';
import Resources from './pages/Resources';
import Webinars from './pages/Webinars';
import Blogs from './pages/Blogs';
import Podcast from './pages/Podcast';
import Events from './pages/Events';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allenablers" element={<AllEnablers />} />
      <Route path="/memberlogin" element={<MemberLogin />} />
      <Route path="/membership" element={<MemberShip />} />
      <Route path="/events" element={<Events />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/resources/podcast" element={<Podcast />} />
      <Route path="/resources/webinars" element={<Webinars />} />
      <Route path="/resources/blog" element={<Blogs />} />
    </Routes>
  )
}

export default App