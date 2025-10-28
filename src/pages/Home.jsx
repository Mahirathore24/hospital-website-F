import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const quotes = [
    {text: 'Excellent care and friendly staff — I felt listened to and well treated.', author:'Asha K.'},
    {text: 'Quick appointment and the doctor was very professional.', author:'Ravi P.'},
    {text: 'Modern facilities and great follow-up. Highly recommend!', author:'Neha S.'}
  ]
  const [qIndex, setQIndex] = React.useState(0)
  React.useEffect(()=>{
    const id = setInterval(()=> setQIndex(i => (i+1) % quotes.length), 4200)
    return ()=> clearInterval(id)
  },[])

  return (
    <section className="home-simple container">
      <header style={{marginBottom:'1rem'}}>
        <h1>MediCare+</h1>
        <p className="lead">Compassionate care, expert doctors, and easy online appointments — focused on your wellness.</p>
      </header>

      {/* Testimonials carousel */}
      <section style={{marginBottom:'1rem'}}>
        <h3>What our patients say</h3>
        <div className="testimonials">
          {/** We'll render slides below via JS state */}
        </div>
      </section>

      <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'1rem'}}>
        <Link to="/appointments" className="btn primary">Book Appointment</Link>
        <Link to="/services" className="btn">Explore Services</Link>
        <Link to="/doctors" className="btn">Meet Doctors</Link>
      </div>

      <section className="grid" style={{marginBottom:'1rem'}}>
        <div className="card">
          <h3>📅 Easy Booking</h3>
          <p className="muted">Book appointments online in minutes with real-time availability.</p>
        </div>
        <div className="card">
          <h3>🩺 Trusted Care</h3>
          <p className="muted">Our specialists provide evidence-based treatments with compassion.</p>
        </div>
        <div className="card">
          <h3>🏥 Facilities</h3>
          <p className="muted">Modern labs, imaging, and in-patient care for comprehensive treatment.</p>
        </div>
      </section>

      <section style={{marginTop:'1rem'}}>
        <h2>Why choose MediCare+</h2>
        <ul className="muted" style={{lineHeight:1.8}}>
          <li>Experienced, board-certified doctors across specialties.</li>
          <li>24/7 emergency and rapid response teams.</li>
          <li>Seamless digital experience: appointments, records, and follow-ups.</li>
        </ul>
      </section>

      <div className="testimonials-wrap">
        <div className="testimonial card">
          <p style={{fontStyle:'italic'}}>{quotes[qIndex].text}</p>
          <p className="muted" style={{textAlign:'right'}}>— {quotes[qIndex].author}</p>
        </div>
      </div>
    </section>
  )
}

