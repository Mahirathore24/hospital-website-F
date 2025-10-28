import React from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [error,setError] = React.useState(null)
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault(); setError(null)
    try{
      const res = await API.post('/login',{ email, password })
      if(res.token){ localStorage.setItem('mc_token', res.token); localStorage.setItem('mc_user', JSON.stringify(res.user)); window.dispatchEvent(new Event('authChanged')); alert('Login successful'); navigate('/profile') }
    }catch(err){
      setError(err.message || 'Login failed')
    }
  }

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={submit} className="auth-card">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn primary" type="submit">Login</button>
        {error && <p className="muted">{error}</p>}
      </form>
    </section>
  )
}
