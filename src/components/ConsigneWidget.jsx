import { useState } from 'react'
import ConsignePanel from './ConsignePanel'
import './ConsigneWidget.css'

function ConsigneWidget() {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <>
      <div className="consigne">
        <button
          className="consigne__trigger"
          onClick={() => setPanelOpen(true)}
          aria-label="Système de consigne"
        >
          <span className="consigne__icon">{'\uD83D\uDD04'}</span>
          <span className="consigne__label">Consigne</span>
        </button>
      </div>
      <ConsignePanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  )
}

export default ConsigneWidget
