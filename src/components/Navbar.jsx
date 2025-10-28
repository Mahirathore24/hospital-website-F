import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const [user, setUser] = React.useState(()=>{
    try{ return JSON.parse(localStorage.getItem('mc_user')) }catch(e){ return null }
  })

  React.useEffect(()=>{
    function onAuth(){ try{ setUser(JSON.parse(localStorage.getItem('mc_user'))) }catch(e){ setUser(null) } }
    window.addEventListener('authChanged', onAuth)
    return ()=> window.removeEventListener('authChanged', onAuth)
  },[])

  function logout(){ localStorage.removeItem('mc_token'); localStorage.removeItem('mc_user'); window.dispatchEvent(new Event('authChanged')); navigate('/') }

  // theme toggle
  const [theme, setTheme] = React.useState(()=> localStorage.getItem('site_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  React.useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('site_theme', theme)
  },[theme])

  function toggleTheme(){ setTheme(t => t === 'dark' ? 'light' : 'dark') }

  return (
    <header className="nav">
      <div className="brand"><span className="logo" aria-hidden="true">🌡️</span> <span className="brand-text">MediCare+ Hospital</span></div>

      <button className={`nav-toggle ${open? 'open':''}`} aria-label="Toggle menu" onClick={()=>setOpen(o=>!o)}>
        <span></span><span></span><span></span>
      </button>

      <nav className={`nav-links ${open? 'show':''}`} onClick={()=>setOpen(false)}>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/appointments">Appointment</Link>
      </nav>

      <div className="nav-auth">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">{theme === 'dark' ? '🌙' : '☀️'}</button>
        {user?.name ? (
          <>
            <button className="btn" onClick={()=>navigate('/profile')}>👤 Welcome, {user.name}</button>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn primary" onClick={()=>navigate('/login')}>Login</button>
            <button className="btn" onClick={()=>navigate('/signup')}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  )
}
