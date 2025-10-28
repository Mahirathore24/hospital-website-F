import React from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const [name,setName] = React.useState('')
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [confirm,setConfirm] = React.useState('')
  const [error,setError] = React.useState(null)
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault(); setError(null)
    if(password !== confirm){ setError('Passwords do not match'); return }
    try{
      const res = await API.post('/signup',{ name, email, password })
      if(res.token){ 
        localStorage.setItem('mc_token', res.token); 
        localStorage.setItem('mc_user', JSON.stringify(res.user)); 
        window.dispatchEvent(new Event('authChanged')); 
        alert('Account created'); 
        navigate('/profile') 
      }
    }catch(err){ 
      console.error('Signup error:', err)
      if(err.message && err.message.includes('fetch')) {
        setError('❌ Cannot connect to server. Backend is not running. See instructions below.')
      } else {
        setError(err.message || 'Signup failed')
      }
    }
  }

  return (
    <section>
      <h2>Sign Up</h2>
      <form onSubmit={submit} className="auth-card">
        <input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
        <button className="btn primary" type="submit">Sign Up</button>
        {error && <p className="muted">{error}</p>}
      </form>
    </section>
  )
}
