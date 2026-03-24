import { useState, useEffect, useRef } from 'react'
import './ConsignePanel.css'

const RATES = { '5L': 3, '6L': 4, '20L': 10 }
const PALIERS = [10, 20, 30, 50, 100]

function getNextPalier(amount) {
  return PALIERS.find((p) => p > amount) || null
}

function generateReturnId() {
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `FUT-2025-${rand}`
}

function ConsignePanel({ open, onClose }) {
  const [tab, setTab] = useState('calc')
  const overlayRef = useRef(null)

  // Calculator state
  const [futs, setFuts] = useState(1)
  const [format, setFormat] = useState('5L')
  const cagnotte = futs * RATES[format]
  const nextPalier = getNextPalier(cagnotte)
  const futsNeeded = nextPalier ? Math.ceil((nextPalier - cagnotte) / RATES[format]) : 0
  const progressPercent = nextPalier ? Math.min((cagnotte / nextPalier) * 100, 100) : 100

  // Return label state
  const [labelForm, setLabelForm] = useState({ nom: '', email: '', adresse: '', date: '' })
  const [labelGenerated, setLabelGenerated] = useState(false)
  const [returnId, setReturnId] = useState('')

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleGenerate = () => {
    setReturnId(generateReturnId())
    setLabelGenerated(true)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleClose = () => {
    setLabelGenerated(false)
    setLabelForm({ nom: '', email: '', adresse: '', date: '' })
    onClose()
  }

  if (!open) return null

  return (
    <div ref={overlayRef} className="consigne-overlay" onClick={handleOverlay}>
      <div className="consigne-panel">
        <button className="consigne-panel__close" onClick={handleClose} aria-label="Fermer">&times;</button>

        <div className="consigne-panel__tabs">
          <button
            className={`consigne-panel__tab ${tab === 'calc' ? 'consigne-panel__tab--active' : ''}`}
            onClick={() => setTab('calc')}
          >
            Calculateur
          </button>
          <button
            className={`consigne-panel__tab ${tab === 'label' ? 'consigne-panel__tab--active' : ''}`}
            onClick={() => setTab('label')}
          >
            Étiquette de retour
          </button>
        </div>

        {tab === 'calc' ? (
          <div className="consigne-panel__calc">
            <h3 className="consigne-panel__title">Combien rapporte votre consigne ?</h3>

            <div className="consigne-panel__selector">
              <label className="consigne-panel__label">Nombre de fûts retournés</label>
              <div className="consigne-panel__counter">
                <button className="consigne-panel__counter-btn" onClick={() => setFuts(Math.max(1, futs - 1))}>−</button>
                <span className="consigne-panel__counter-value">{futs}</span>
                <button className="consigne-panel__counter-btn" onClick={() => setFuts(Math.min(20, futs + 1))}>+</button>
              </div>
            </div>

            <div className="consigne-panel__selector">
              <label className="consigne-panel__label">Format</label>
              <div className="consigne-panel__formats">
                {Object.keys(RATES).map((f) => (
                  <button
                    key={f}
                    className={`consigne-panel__format ${format === f ? 'consigne-panel__format--active' : ''}`}
                    onClick={() => setFormat(f)}
                  >
                    {f} <span className="consigne-panel__format-rate">({RATES[f]}€/fût)</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="consigne-panel__result">
              <span className="consigne-panel__result-label">Votre cagnotte estimée :</span>
              <span className="consigne-panel__result-amount">{cagnotte}€</span>
            </div>

            <p className="consigne-panel__mention">
              Créditée automatiquement sous 48h sur votre compte FutLocal
            </p>

            {nextPalier && (
              <div className="consigne-panel__progress">
                <div className="consigne-panel__progress-bar">
                  <div className="consigne-panel__progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
                <p className="consigne-panel__progress-text">
                  Plus que <strong>{futsNeeded} fût{futsNeeded > 1 ? 's' : ''}</strong> pour atteindre <strong>{nextPalier}€</strong> de cagnotte !
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="consigne-panel__label-tab">
            {!labelGenerated ? (
              <>
                <h3 className="consigne-panel__title">Demander une étiquette de retour</h3>
                <div className="consigne-panel__form">
                  <input
                    className="consigne-panel__input"
                    placeholder="Nom"
                    value={labelForm.nom}
                    onChange={(e) => setLabelForm({ ...labelForm, nom: e.target.value })}
                  />
                  <input
                    className="consigne-panel__input"
                    type="email"
                    placeholder="Email"
                    value={labelForm.email}
                    onChange={(e) => setLabelForm({ ...labelForm, email: e.target.value })}
                  />
                  <input
                    className="consigne-panel__input"
                    placeholder="Adresse de collecte"
                    value={labelForm.adresse}
                    onChange={(e) => setLabelForm({ ...labelForm, adresse: e.target.value })}
                  />
                  <input
                    className="consigne-panel__input"
                    type="date"
                    placeholder="Date souhaitée"
                    value={labelForm.date}
                    onChange={(e) => setLabelForm({ ...labelForm, date: e.target.value })}
                  />
                  <button
                    className="btn btn-gold consigne-panel__generate"
                    onClick={handleGenerate}
                    disabled={!labelForm.nom || !labelForm.email || !labelForm.adresse || !labelForm.date}
                  >
                    Générer mon étiquette
                  </button>
                </div>
              </>
            ) : (
              <div className="consigne-panel__ticket" id="consigne-ticket">
                <div className="consigne-panel__ticket-header">
                  <span className="consigne-panel__ticket-logo">
                    <span className="consigne-panel__ticket-logo-f">F</span>utLocal
                  </span>
                  <span className="consigne-panel__ticket-badge">RETOUR CONSIGNE</span>
                </div>

                <div className="consigne-panel__ticket-body">
                  <div className="consigne-panel__ticket-row">
                    <span className="consigne-panel__ticket-label">N° de retour</span>
                    <span className="consigne-panel__ticket-value consigne-panel__ticket-id">{returnId}</span>
                  </div>
                  <div className="consigne-panel__ticket-row">
                    <span className="consigne-panel__ticket-label">Expéditeur</span>
                    <span className="consigne-panel__ticket-value">{labelForm.nom}</span>
                  </div>
                  <div className="consigne-panel__ticket-row">
                    <span className="consigne-panel__ticket-label">Collecte</span>
                    <span className="consigne-panel__ticket-value">{labelForm.adresse}</span>
                  </div>
                  <div className="consigne-panel__ticket-row">
                    <span className="consigne-panel__ticket-label">Date</span>
                    <span className="consigne-panel__ticket-value">{labelForm.date}</span>
                  </div>

                  <div className="consigne-panel__ticket-divider" />

                  <div className="consigne-panel__ticket-row">
                    <span className="consigne-panel__ticket-label">Destination</span>
                    <span className="consigne-panel__ticket-value">
                      FutLocal Logistique<br />
                      12 rue des Brasseurs<br />
                      75011 Paris
                    </span>
                  </div>
                </div>

                <div className="consigne-panel__ticket-qr">
                  <svg viewBox="0 0 100 100" className="consigne-panel__qr-svg">
                    <rect x="5" y="5" width="25" height="25" rx="2" fill="var(--gold)" />
                    <rect x="35" y="5" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="50" y="5" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="70" y="5" width="25" height="25" rx="2" fill="var(--gold)" />
                    <rect x="10" y="10" width="15" height="15" rx="1" fill="var(--black)" />
                    <rect x="75" y="10" width="15" height="15" rx="1" fill="var(--black)" />
                    <rect x="13" y="13" width="9" height="9" rx="1" fill="var(--gold)" />
                    <rect x="78" y="13" width="9" height="9" rx="1" fill="var(--gold)" />
                    <rect x="5" y="35" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="20" y="35" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="40" y="35" width="20" height="10" rx="1" fill="var(--gold)" />
                    <rect x="65" y="35" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="5" y="50" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="25" y="50" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="45" y="50" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="60" y="50" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="80" y="50" width="15" height="10" rx="1" fill="var(--gold)" />
                    <rect x="5" y="70" width="25" height="25" rx="2" fill="var(--gold)" />
                    <rect x="10" y="75" width="15" height="15" rx="1" fill="var(--black)" />
                    <rect x="13" y="78" width="9" height="9" rx="1" fill="var(--gold)" />
                    <rect x="35" y="70" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="55" y="70" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="70" y="70" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="85" y="70" width="10" height="10" rx="1" fill="var(--gold)" />
                    <rect x="40" y="85" width="20" height="10" rx="1" fill="var(--gold)" />
                    <rect x="70" y="85" width="25" height="10" rx="1" fill="var(--gold)" />
                  </svg>
                </div>

                <button className="btn btn-gold consigne-panel__print" onClick={handlePrint}>
                  Imprimer l'étiquette
                </button>
                <button className="consigne-panel__new" onClick={() => setLabelGenerated(false)}>
                  Générer une autre étiquette
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsignePanel
