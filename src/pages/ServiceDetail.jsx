import React from 'react'
import { useParams, Link } from 'react-router-dom'

const items = [
  'General Checkup','Skin & Dermatology','Cardiology','Neurology','Dental Care','Pediatrics','Orthopedics','Physiotherapy','Eye Care','Emergency 24/7'
]

function slugify(s){ return s.toLowerCase().replace(/[\s\/]+/g,'-').replace(/[^a-z0-9\-]/g,'') }

export default function ServiceDetail(){
  const { slug } = useParams()
  const name = items.find(i => slugify(i) === slug)

  if(!name) return (
    <section>
      <h2>Service not found</h2>
      <p>The requested service was not found.</p>
      <Link to="/services" className="btn">Back to Services</Link>
    </section>
  )

  return (
    <section>
      <h2>{name}</h2>
      <p>Details about {name}. We provide top-quality care for {name.toLowerCase()} with experienced specialists and modern equipment.</p>
      <div style={{display:'flex', gap:'.5rem'}}>
        <Link to={`/appointments?department=${encodeURIComponent(name)}`} className="btn primary">Book Appointment</Link>
        <Link to="/services" className="btn">Back to Services</Link>
      </div>
    </section>
  )
}
