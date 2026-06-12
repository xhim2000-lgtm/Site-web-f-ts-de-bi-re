import { useEffect, useRef, useState } from 'react'
import { useDeliveryZone } from './DeliveryZoneContext'
import { checkDeliveryZone } from '../data/zones'
import './DeliveryZone.css'

export function DeliveryBanner() {
  const { zone, cp, openZoneModal } = useDeliveryZone()

  return (
    <div className="zone-banner">
      <button className="zone-banner__btn" onClick={openZoneModal}>
        <span className="zone-banner__pin">📍</span>
        {zone ? (
          <span className="zone-banner__label">
            Livraison <strong>{zone.label}</strong> · <span className="zone-banner__eta">{zone.eta}</span>
            <span className="zone-banner__cp">({cp})</span>
            <span className="zone-banner__change">Modifier →</span>
          </span>
        ) : (
          <span className="zone-banner__label">
            Vérifier ma zone de livraison <span className="zone-banner__arrow">→</span>
          </span>
        )}
      </button>
    </div>
  )
}

export function DeliveryZoneModal() {
  const { cp, zone, saveZone, modalOpen, closeZoneModal } = useDeliveryZone()
  const [input, setInput] = useState(cp)
  const [check, setCheck] = useState(zone)
  const overlayRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
      setInput(cp)
      setCheck(zone)
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalOpen, cp, zone])

  if (!modalOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = checkDeliveryZone(input)
    setCheck(result)
    if (result) saveZone(input)
  }

  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) closeZoneModal()
  }

  return (
    <div ref={overlayRef} className="zone-overlay" onClick={handleOverlay}>
      <div className="zone-modal">
        <button className="zone-modal__close" onClick={closeZoneModal} aria-label="Fermer">&times;</button>
        <span className="zone-modal__pin">📍</span>
        <h2 className="zone-modal__title">Vérifier ma zone de livraison</h2>
        <p className="zone-modal__sub">Renseignez votre code postal pour connaître votre délai estimé.</p>

        <form className="zone-modal__form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="zone-modal__input"
            placeholder="Ex: 75011, B-1000, CH-1201…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-gold zone-modal__submit">Vérifier</button>
        </form>

        {check === null && input && (
          <div className="zone-modal__result zone-modal__result--miss">
            <strong>Désolé,</strong> ce code postal ne semble pas reconnu. Vérifiez la saisie ou contactez-nous pour une livraison sur mesure.
          </div>
        )}

        {check && (
          <div className={`zone-modal__result zone-modal__result--${check.tone}`}>
            <div className="zone-modal__result-head">
              <span className="zone-modal__check">✓</span>
              <span>{check.label}</span>
              <span className="zone-modal__eta">{check.eta}</span>
            </div>
            <p className="zone-modal__msg">{check.message}</p>
          </div>
        )}

        <div className="zone-modal__zones">
          <p className="zone-modal__zones-title">Nos zones couvertes :</p>
          <ul className="zone-modal__zones-list">
            <li>🇫🇷 Paris, Lyon, Bordeaux métropoles — J+1</li>
            <li>🇫🇷 Reste France métropolitaine — J+2/J+3</li>
            <li>🇧🇪 Belgique — J+2</li>
            <li>🇱🇺 Luxembourg — J+2</li>
            <li>🇨🇭 Suisse — J+3 (DDP, taxes incluses)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
