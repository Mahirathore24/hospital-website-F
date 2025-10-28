import React from 'react'
import { useLocation } from 'react-router-dom'
import API from '../api'

export default function Appointments(){
  const [form, setForm] = React.useState({ name:'', email:'', phone:'', doctor:'', department:'', date:'', time:'', message:'' })
  const [status, setStatus] = React.useState(null)
  const token = localStorage.getItem('mc_token')
  const location = useLocation()
  const [doctors, setDoctors] = React.useState([])

  function update(e){ setForm({...form, [e.target.name]: e.target.value}) }

  React.useEffect(()=>{
    // prefill from query params like ?doctor=Dr%20Name or ?department=Cardiology
    const q = new URLSearchParams(location.search)
    const doctor = q.get('doctor')
    const department = q.get('department')
    if(doctor || department){
      setForm(f => ({ ...f, ...(department?{department}:{}) }))
      if(doctor){
        // try to resolve doctor name to id once doctors list is loaded
        // If doctors list not loaded yet, we will set it when loaded
        setForm(f => ({ ...f, doctor: doctor }))
      }
    }
  },[location.search])

  React.useEffect(()=>{
    let mounted = true
    API.get('/doctors').then(res=>{
      if(!mounted) return
      const list = res.doctors || []
      setDoctors(list)
      // if form.doctor contains a name (prefill), try to map name -> id
      if(form.doctor){
        const match = list.find(d => d.name.toLowerCase() === String(form.doctor).toLowerCase())
        if(match){ setForm(f=>({...f, doctor: match._id})) }
      }
    }).catch(()=>{})
    return ()=>{ mounted=false }
  },[])

  async function submit(e){
    e.preventDefault();
    try{
      const res = await API.post('/appointments', form, token)
      setStatus('Appointment booked')
      setForm({ name:'', email:'', phone:'', doctor:'', department:'', date:'', time:'', message:'' })
    }catch(err){ setStatus(err.message || 'Failed to book') }
  }

  return (
    <section>
      <h2>Book Appointment</h2>
      <form onSubmit={submit} className="contact-form">
        <input name="name" value={form.name} onChange={update} placeholder="Full name" required />
        <input name="email" value={form.email} onChange={update} placeholder="Email" required />
        <input name="phone" value={form.phone} onChange={update} placeholder="Phone" required />
        <label style={{display:'block',marginTop:'.25rem'}}>Doctor</label>
        <select name="doctor" value={form.doctor} onChange={update} required>
          <option value="">-- Select a doctor --</option>
          {doctors.map(d=> (<option key={d._id} value={d._id}>{d.name} — {d.specialization}</option>))}
        </select>
        <label style={{display:'block',marginTop:'.25rem'}}>Department</label>
        <input name="department" value={form.department} onChange={update} placeholder="Department" />
        <input name="date" type="date" value={form.date} onChange={update} required />
        <input name="time" type="time" value={form.time} onChange={update} required />
        <textarea name="message" value={form.message} onChange={update} rows={3} placeholder="Message" />
        <button className="btn primary" type="submit">Confirm Appointment</button>
        {status && <p className="muted">{status}</p>}
      </form>
    </section>
  )
}
