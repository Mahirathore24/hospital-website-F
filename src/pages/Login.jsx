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
      if(res.token){ 
        localStorage.setItem('mc_token', res.token); 
        localStorage.setItem('mc_user', JSON.stringify(res.user)); 
        window.dispatchEvent(new Event('authChanged')); 
        alert('Login successful'); 
        navigate('/profile') 
      }
    }catch(err){
      console.error('Login error:', err)
      // Better error message for network failures
      if(err.message && err.message.includes('fetch')) {
        setError('❌ Cannot connect to server. Please ensure:\n1. Backend server is running (npm start in /backend folder)\n2. MongoDB is connected\n3. Server is at http://localhost:5000')
      } else {
        setError(err.message || 'Login failed. Please check your credentials.')
      }
    }
  }

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={submit} className="auth-card">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn primary" type="submit">Login</button>
        {error && <div style={{marginTop:'1rem',padding:'1rem',background:'#fee',borderRadius:'8px',border:'1px solid #fcc'}}>
          <p style={{margin:0,color:'#c33',whiteSpace:'pre-line',fontSize:'.9rem'}}>{error}</p>
        </div>}
        
        <div style={{marginTop:'1.5rem',padding:'1rem',background:'var(--card-bg)',borderRadius:'8px',border:'1px solid var(--panel-border)'}}>
          <p style={{margin:'0 0 .5rem 0',fontWeight:'bold'}}>ℹ️ Backend Setup Required:</p>
          <ol style={{margin:0,paddingLeft:'1.5rem',fontSize:'.85rem',lineHeight:'1.6'}}>
            <li>Create <code>.env</code> in backend folder with:<br/>
              <code style={{display:'block',background:'#f5f5f5',padding:'.5rem',borderRadius:'4px',marginTop:'.25rem'}}>
                MONGO_URI=mongodb://localhost:27017/medicare<br/>
                JWT_SECRET=your-secret-key<br/>
                PORT=5000
              </code>
            </li>
            <li>Install MongoDB locally or use MongoDB Atlas</li>
            <li>Run backend: <code>cd backend && npm install && npm start</code></li>
            <li>Backend should be at: <strong>http://localhost:5000</strong></li>
          </ol>
        </div>
      </form>
    </section>
  )
}
