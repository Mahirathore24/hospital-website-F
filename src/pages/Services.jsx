import React from 'react'
import { Link } from 'react-router-dom'

const items = [
  'General Checkup','Skin & Dermatology','Cardiology','Neurology','Dental Care','Pediatrics','Orthopedics','Physiotherapy','Eye Care','Emergency 24/7'
]

function slugify(s){
  return s.toLowerCase().replace(/[\s\/]+/g,'-').replace(/[^a-z0-9\-]/g,'')
}

export default function Services(){
  return (
    <section>
      <h2>Our Services</h2>
      <div className="grid">
        {items.map((s,i) => (
          <div key={s} className="card service-item">
            <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
              <div className="icon-animate">{['🩺','🧴','❤️','🧠','🦷','🧒','🦴','🤸','👁️','🚨'][i%10]}</div>
              <div>
                <h4 style={{margin:0}}>{s} <span className="badge">{i<3? 'Popular':''}</span></h4>
                <p className="muted">Quality care for {s.toLowerCase()} with experienced staff and modern equipment.</p>
              </div>
            </div>
            <div style={{display:'flex',gap:'.5rem',marginTop:'.6rem'}}>
              <Link to={`/service/${slugify(s)}`} className="btn">Details</Link>
              <Link to={`/appointments?department=${encodeURIComponent(s)}`} className="btn primary">Book</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
