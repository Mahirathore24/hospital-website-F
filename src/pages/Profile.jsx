import React from 'react'
import API from '../api'

export default function Profile(){
  const [user, setUser] = React.useState(()=>{ try{ return JSON.parse(localStorage.getItem('mc_user')) }catch(e){ return null } })
  const [appts, setAppts] = React.useState([])
  const [err, setErr] = React.useState(null)
  const token = localStorage.getItem('mc_token')

  React.useEffect(()=>{
    async function load(){
      if(!token) return;
      try{
        const res = await API.get('/appointments', token)
        // filter appointments for this user (if server returns all)
        const mine = (res.appointments || []).filter(a=>a.email === user?.email)
        setAppts(mine)
      }catch(e){ setErr('Could not load appointments (admin protected)') }
    }
    load()
  },[])

  if(!user) return <p>Please login to view profile.</p>

  return (
    <section>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <h3>Your Appointments</h3>
      {err && <p className="muted">{err}</p>}
      <ul>
        {appts.length===0 && <li>No appointments found.</li>}
        {appts.map(a=> (
          <li key={a._id || Math.random()}>{new Date(a.date).toLocaleDateString()} {a.time} — {a.doctor?.name || a.doctor}</li>
        ))}
      </ul>
    </section>
  )
}
