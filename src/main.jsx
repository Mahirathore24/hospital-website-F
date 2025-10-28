import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Scroll reveal: add 'in-view' class to elements when they enter the viewport
if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((ent) => {
      if (ent.isIntersecting) {
        ent.target.classList.add('in-view')
        io.unobserve(ent.target)
      }
    })
  }, { threshold: 0.12 })

  // Observe common elements: cards, features, hero art, list items
  const selectors = ['.card', '.feature', '.hero-art', '.grid > *', 'li', '.service-item']
  const els = document.querySelectorAll(selectors.join(','))
  els.forEach((el, i) => {
    el.classList.add('reveal')
    io.observe(el)
  })
}

// Cursor follower
if (typeof window !== 'undefined') {
  const dot = document.createElement('div')
  dot.className = 'cursor-dot hidden'
  document.body.appendChild(dot)

  let mouse = { x: -999, y: -999 }
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY
    dot.style.left = mouse.x + 'px'
    dot.style.top = mouse.y + 'px'
    dot.classList.remove('hidden')
  })
  window.addEventListener('mouseleave', () => dot.classList.add('hidden'))

  // enlarge dot on CTA hover
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest && e.target.closest('.btn')) dot.classList.add('cta-hover')
  })
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest && e.target.closest('.btn')) dot.classList.remove('cta-hover')
  })

  // little click pop
  document.addEventListener('click', (e) => {
    dot.animate([
      { transform: 'translate(-50%,-50%) scale(1.6)', opacity: 0.95 },
      { transform: 'translate(-50%,-50%) scale(0.9)', opacity: 1 }
    ], { duration: 220, easing: 'cubic-bezier(.2,.9,.2,1)' })
  })
}
