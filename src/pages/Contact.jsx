import React from 'react'
import API from '../api'

export default function Contact(){
  const [form, setForm] = React.useState({ name:'', email:'', phone:'', message:'' })
  const [status, setStatus] = React.useState(null)

  function update(e){ setForm({...form, [e.target.name]: e.target.value}) }

  async function submit(e){
    e.preventDefault();
    setStatus('Sending...')
    try{
      const res = await API.post('/contact', form)
      setStatus(res.message || 'Message sent')
      setForm({name:'',email:'',phone:'',message:''})
    }catch(err){
      setStatus(err.message || 'Failed to send')
    }
  }

  return (
    <section>
      <h2>Contact Us</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:'1rem'}}>
        <form onSubmit={submit} className="contact-form">
          <input name="name" value={form.name} onChange={update} placeholder="Full name" required />
          <input name="email" value={form.email} onChange={update} placeholder="Email" required />
          <input name="phone" value={form.phone} onChange={update} placeholder="Phone" required />
          <textarea name="message" value={form.message} onChange={update} rows={4} placeholder="Message" required />
          <button className="btn primary" type="submit">Send Message</button>
          {status && <p className="muted">{status}</p>}
        </form>
        <aside className="card">
          <h4>Reach Us</h4>
          <p className="muted">📍 123 Healing Way<br/>📞 +1 (555) 123-4567<br/>✉️ contact@medicare.example</p>
          <div style={{marginTop:'.5rem'}}>
            <strong>Hours</strong>
            <p className="muted">Mon-Sat: 8am - 8pm<br/>Sun: Emergency Only</p>
          </div>
          <div style={{marginTop:'.5rem'}}>Follow: <span>🐦</span> <span>📘</span> <span>📸</span></div>
        </aside>
      </div>
    </section>
  )
}
