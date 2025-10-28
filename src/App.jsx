import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Appointments from './pages/Appointments'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import ServiceDetail from './pages/ServiceDetail'
import DoctorDetail from './pages/DoctorDetail'
import Footer from './components/Footer'
import ImageModal from './components/ImageModal'

export default function App(){
  const location = useLocation()
  return (
    <div>
      <Navbar />
      <main className="container route-wrap" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/service/:slug" element={<ServiceDetail/>} />
          <Route path="/doctors" element={<Doctors/>} />
          <Route path="/doctor/:slug" element={<DoctorDetail/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/appointments" element={<Appointments/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </main>
      <Footer />
      <ImageModal />
    </div>
  )
}
