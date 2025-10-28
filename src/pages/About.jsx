import React from 'react'

export default function About(){
  return (
    <section>
      <h2>About Us</h2>
      <p>Mission: Deliver compassionate, accessible, and high-quality healthcare to our community.</p>
      <p>Vision: Be a leading medical center recognized for clinical excellence and innovation.</p>
      <div style={{marginTop:'1rem',display:'flex',gap:'1rem',flexWrap:'wrap'}}>
        <div className="card">
          <h4>👩‍⚕️ Expert Team</h4>
          <p className="muted">Board-certified doctors and caring staff.</p>
        </div>
        <div className="card">
          <h4>🏥 Modern Facilities</h4>
          <p className="muted">State-of-the-art equipment and labs.</p>
        </div>
        <div className="card">
          <h4>🤝 Community Care</h4>
          <p className="muted">Outreach programs and preventive health services.</p>
        </div>
      </div>
    </section>
  )
}
