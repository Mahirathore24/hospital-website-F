import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="col">
          <h4>📍 MediCare+ Hospital</h4>
          <p className="muted">123 Healing Way, Wellness City<br/>Phone: +1 (555) 123-4567</p>
        </div>
        <div className="col">
          <h4>Quick Links</h4>
          <nav className="muted">
            <Link to="/services">Services</Link> · <Link to="/doctors">Doctors</Link> · <Link to="/appointments">Book</Link>
          </nav>
        </div>
        <div className="col">
          <h4>Connect</h4>
          <p>Follow us: <span>🐦</span> <span>📘</span> <span>📸</span></p>
        </div>
      </div>
      <div className="container muted" style={{textAlign:'center',paddingTop:'.75rem',fontSize:'.9rem'}}>© {new Date().getFullYear()} MediCare+ — All rights reserved</div>
    </footer>
  )
}
