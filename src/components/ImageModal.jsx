import React from 'react'

export default function ImageModal(){
  const [open, setOpen] = React.useState(false)
  const [img, setImg] = React.useState({src:'', alt:''})

  React.useEffect(()=>{
    function handler(e){
      const d = e.detail || {}
      setImg({ src: d.src || '', alt: d.alt || '' })
      setOpen(true)
    }
    window.addEventListener('openImage', handler)
    return ()=> window.removeEventListener('openImage', handler)
  },[])

  if(!open) return null

  return (
    <div className="img-modal" onClick={()=>setOpen(false)} role="dialog" aria-modal="true">
      <div className="img-modal-inner" onClick={(e)=>e.stopPropagation()}>
        <button className="img-modal-close" onClick={()=>setOpen(false)} aria-label="Close">✕</button>
        <img src={img.src} alt={img.alt} />
        <div className="img-modal-caption">{img.alt}</div>
      </div>
    </div>
  )
}
