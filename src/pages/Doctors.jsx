import React from 'react'
import { Link } from 'react-router-dom'

const doctors = [
  {name:'Dr. Priya Sharma', spec:'Dermatologist', image:'/images/doctor1.jpg'},
  {name:'Dr. Raj Malhotra', spec:'Cardiologist', image:'/images/doctor2.jpg'},
  {name:'Dr. Neha Verma', spec:'Neurologist', image:'/images/doctor3.jpg'},
  {name:'Dr. Amit Singh', spec:'Dentist', image:'/images/doctor4.jpg'},
  {name:'Dr. Kavita Mehra', spec:'Pediatrician', image:'/images/doctor5.jpg'},
  {name:'Dr. Arjun Patel', spec:'Orthopedic Surgeon', image:'/images/doctor6.jpg'},
  {name:'Dr. Sneha Reddy', spec:'Gynecologist', image:'/images/doctor7.jpg'},
  {name:'Dr. Manish Kumar', spec:'Physiotherapist', image:'/images/doctor8.jpg'},
  {name:'Dr. Aditi Joshi', spec:'Ophthalmologist', image:'/images/doctor9.jpg'},
  {name:'Dr. Vikram Chauhan', spec:'ENT Specialist', image:'/images/doctor10.jpg'},
  {name:'Dr. Riya Das', spec:'Psychiatrist', image:'/images/doctor11.jpg'},
  {name:'Dr. Ankit Bansal', spec:'Oncologist', image:'/images/doctor12.jpg'}
]

function slugify(s){
  return s.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')
}

export default function Doctors(){
  return (
    <section>
      <h2>Our Doctors</h2>
      <div className="grid doctors-grid">
        {doctors.map((d,i)=> (
          <div className="card doctor-card" key={i}>
            <div style={{display:'flex', alignItems:'center', gap:'.75rem'}}>
              <div className="img-wrap" style={{cursor:'pointer'}}>
                <img
                  src={d.image ? d.image : `/images/doctor${i+1}.svg`}
                  alt={d.name}
                  loading="lazy"
                  onError={(e)=>{ e.target.onerror=null; e.target.src=`/images/doctor${i+1}.svg` }}
                  onClick={() => window.dispatchEvent(new CustomEvent('openImage', { detail: { src: d.image ? d.image : `/images/doctor${i+1}.svg`, alt: d.name } }))}
                />
              </div>
              <div>
                <h4 style={{margin:0}}>{d.name} <span className="badge">{d.spec.split(' ')[0]}</span></h4>
                <p className="muted" style={{margin:0}}>{d.spec} • 10+ yrs experience</p>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'.5rem'}}>
              <Link to={`/appointments?doctor=${encodeURIComponent(d.name)}`} className="btn primary">Book</Link>
              <Link to={`/doctor/${slugify(d.name)}`} className="btn">Profile</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
