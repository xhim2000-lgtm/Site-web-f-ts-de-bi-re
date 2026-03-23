import { useState } from 'react'
import './ConsigneWidget.css'

function ConsigneWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className={`consigne ${open ? 'consigne--open' : ''}`}>
      <button
        className="consigne__trigger"
        onClick={() => setOpen(!open)}
        aria-label="Système de consigne"
      >
        <span className="consigne__icon">{'\uD83D\uDD04'}</span>
        <span className="consigne__label">Consigne</span>
      </button>

      {open && (
        <div className="consigne__panel">
          <p className="consigne__text">
            <strong>Votre fût vide = une cagnotte créditée en 48h automatiquement.</strong>
          </p>
          <p className="consigne__detail">
            Chaque fût retourné alimente votre cagnotte FutLocal.
            Utilisez-la sur votre prochaine commande ou demandez un virement.
            Simple, automatique, sans paperasse.
          </p>
          <button
            className="consigne__close"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
          >
            Compris
          </button>
        </div>
      )}
    </div>
  )
}

export default ConsigneWidget
