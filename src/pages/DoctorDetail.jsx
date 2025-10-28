import React from 'react'
import { useParams, Link } from 'react-router-dom'

const doctors = [
  {name:'Dr. Priya Sharma', spec:'Dermatologist', image:'/images/doctor1.svg'},
  {name:'Dr. Raj Malhotra', spec:'Cardiologist', image:'/images/doctor2.svg'},
  {name:'Dr. Neha Verma', spec:'Neurologist', image:'/images/doctor3.svg'},
  {name:'Dr. Amit Singh', spec:'Dentist', image:'/images/doctor4.svg'},
  {name:'Dr. Kavita Mehra', spec:'Pediatrician', image:'/images/doctor5.svg'},
  {name:'Dr. Arjun Patel', spec:'Orthopedic Surgeon', image:'/images/doctor6.svg'},
  {name:'Dr. Sneha Reddy', spec:'Gynecologist', image:'/images/doctor7.svg'},
  {name:'Dr. Manish Kumar', spec:'Physiotherapist', image:'/images/doctor8.svg'},
  {name:'Dr. Aditi Joshi', spec:'Ophthalmologist', image:'/images/doctor9.svg'},
  {name:'Dr. Vikram Chauhan', spec:'ENT Specialist', image:'/images/doctor10.svg'},
  {name:'Dr. Riya Das', spec:'Psychiatrist', image:'/images/doctor11.svg'},
  {name:'Dr. Ankit Bansal', spec:'Oncologist', image:'/images/doctor12.svg'}
]

function slugify(s){ return s.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'') }

export default function DoctorDetail(){
  const { slug } = useParams()
  const doc = doctors.find(d => slugify(d.name) === slug)

  if(!doc) return (
    <section>
      <h2>Doctor not found</h2>
      <p>The requested doctor was not found.</p>
      <Link to="/doctors" className="btn">Back to Doctors</Link>
    </section>
  )

  return (
    <section>
      <div style={{display:'flex',gap:'1rem',alignItems:'center',flexWrap:'wrap'}} className="doctor-detail">
        <img
          src={doc.image}
          alt={doc.name}
          style={{width:140,height:140,borderRadius:12,objectFit:'cover',cursor:'pointer'}}
          loading="lazy"
          onError={(e)=>{ e.target.onerror=null; e.target.src=`/images/doctor-placeholder.svg` }}
          onClick={()=> window.dispatchEvent(new CustomEvent('openImage',{ detail: { src: doc.image || '/images/doctor-placeholder.svg', alt: doc.name } }))}
        />
        <div>
          <h2 style={{margin:0}}>{doc.name}</h2>
          <p style={{margin:'4px 0'}}><strong>Specialization:</strong> {doc.spec}</p>
        </div>
      </div>
      <p>Bio: Experienced {doc.spec.toLowerCase()} offering patient-centered care. Dr. {doc.name.split(' ')[1]} brings years of clinical expertise and patient-focused care.</p>
      <div style={{display:'flex', gap:'.5rem'}}>
        <Link to={`/appointments?doctor=${encodeURIComponent(doc.name)}`} className="btn primary">Book Appointment</Link>
        <Link to="/doctors" className="btn">Back to Doctors</Link>
      </div>
          <div style={{marginTop:'.8rem',display:'flex',alignItems:'center',gap:'.75rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'.5rem'}}>
              <img src={doc.image} alt={doc.name} style={{width:56,height:56,borderRadius:8,objectFit:'cover'}} onError={(e)=>{e.target.onerror=null; e.target.src='/images/doctor-placeholder.svg'}}/>
              <div className="muted">Share Dr. {doc.name.split(' ')[1]}'s profile</div>
            </div>
            <div style={{display:'flex',gap:'.5rem'}}>
              <button className="btn" onClick={()=>{
                const url=encodeURIComponent(window.location.href)
                const text=encodeURIComponent(`Check out ${doc.name} at MediCare+`)
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`,'_blank')
              }}>🐦 Twitter</button>
              <button className="btn" onClick={()=>{
                const url=encodeURIComponent(window.location.href)
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`,'_blank')
              }}>📘 Facebook</button>
              <button className="btn" onClick={()=>{
                const url=encodeURIComponent(window.location.href)
                const text=encodeURIComponent(`Dr. ${doc.name} at MediCare+`)
                window.open(`https://wa.me/?text=${text}%20${url}`,'_blank')
              }}>💬 WhatsApp</button>
            </div>
          </div>
    </section>
  )
}
