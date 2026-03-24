import { useState, useEffect, useRef } from 'react'
import { useCart } from './CartContext'
import './Checkout.css'

function Checkout({ open, onClose }) {
  const { items, subtotal, setItems } = useCart()
  const [step, setStep] = useState(1)
  const [payMethod, setPayMethod] = useState('card')
  const [confirmed, setConfirmed] = useState(false)
  const overlayRef = useRef(null)

  const [address, setAddress] = useState({ nom: '', adresse: '', ville: '', cp: '' })
  const [card, setCard] = useState({ numero: '', expiration: '', cvv: '', porteur: '' })

  const shipping = subtotal >= 100 ? 0 : 5
  const total = subtotal + shipping

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setStep(1)
      setConfirmed(false)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleConfirm = () => {
    setConfirmed(true)
    setTimeout(() => {
      setItems([])
    }, 500)
  }

  const handleClose = () => {
    if (confirmed) {
      setStep(1)
      setConfirmed(false)
      setAddress({ nom: '', adresse: '', ville: '', cp: '' })
      setCard({ numero: '', expiration: '', cvv: '', porteur: '' })
    }
    onClose()
  }

  if (!open) return null

  return (
    <div ref={overlayRef} className="checkout-overlay" onClick={handleOverlay}>
      <div className="checkout-modal">
        <button className="checkout__close" onClick={handleClose} aria-label="Fermer">&times;</button>

        {confirmed ? (
          <div className="checkout__confirmed">
            <div className="checkout__confirmed-icon">&#127881;</div>
            <h2 className="checkout__confirmed-title">Commande confirmée !</h2>
            <p className="checkout__confirmed-text">
              Vous recevrez un email de confirmation sous quelques minutes.
            </p>
            <button className="btn btn-gold checkout__confirmed-btn" onClick={handleClose}>
              Retour au site
            </button>
          </div>
        ) : step === 1 ? (
          <>
            <h2 className="checkout__title">Récapitulatif de commande</h2>

            <ul className="checkout__items">
              {items.map((item) => (
                <li key={item.id} className="checkout__item">
                  <span className="checkout__item-name">{item.name}</span>
                  <span className="checkout__item-detail">{item.volume} &times; {item.qty}</span>
                  <span className="checkout__item-price">{item.price * item.qty}€</span>
                </li>
              ))}
            </ul>

            <div className="checkout__totals">
              <div className="checkout__row">
                <span>Sous-total</span><span>{subtotal}€</span>
              </div>
              <div className="checkout__row">
                <span>Livraison</span>
                <span>{shipping === 0 ? <em className="checkout__free">Gratuite</em> : `${shipping}€`}</span>
              </div>
              {shipping > 0 && (
                <p className="checkout__shipping-hint">Gratuite à partir de 100€</p>
              )}
              <div className="checkout__row checkout__row--total">
                <span>Total TTC</span><span>{total}€</span>
              </div>
            </div>

            <h3 className="checkout__subtitle">Adresse de livraison</h3>
            <div className="checkout__form">
              <input
                className="checkout__input"
                placeholder="Nom complet"
                value={address.nom}
                onChange={(e) => setAddress({ ...address, nom: e.target.value })}
              />
              <input
                className="checkout__input"
                placeholder="Adresse"
                value={address.adresse}
                onChange={(e) => setAddress({ ...address, adresse: e.target.value })}
              />
              <div className="checkout__row-inputs">
                <input
                  className="checkout__input"
                  placeholder="Ville"
                  value={address.ville}
                  onChange={(e) => setAddress({ ...address, ville: e.target.value })}
                />
                <input
                  className="checkout__input checkout__input--small"
                  placeholder="Code postal"
                  value={address.cp}
                  onChange={(e) => setAddress({ ...address, cp: e.target.value })}
                />
              </div>
            </div>

            <button
              className="btn btn-gold checkout__next"
              onClick={() => setStep(2)}
              disabled={!address.nom || !address.adresse || !address.ville || !address.cp}
            >
              Continuer vers le paiement
            </button>
          </>
        ) : (
          <>
            <button className="checkout__back" onClick={() => setStep(1)}>
              &#8592; Retour au récapitulatif
            </button>
            <h2 className="checkout__title">Paiement</h2>

            <div className="checkout__methods">
              <button
                className={`checkout__method ${payMethod === 'card' ? 'checkout__method--active' : ''}`}
                onClick={() => setPayMethod('card')}
              >
                <span className="checkout__method-icon">&#128179;</span>
                <span className="checkout__method-label">Carte bancaire</span>
                <span className="checkout__method-brands">
                  <svg viewBox="0 0 48 32" className="checkout__brand-icon"><rect rx="4" width="48" height="32" fill="#1A1F71"/><text x="24" y="21" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">VISA</text></svg>
                  <svg viewBox="0 0 48 32" className="checkout__brand-icon"><rect rx="4" width="48" height="32" fill="#2B2B2B"/><circle cx="19" cy="16" r="10" fill="#EB001B" opacity="0.9"/><circle cx="29" cy="16" r="10" fill="#F79E1B" opacity="0.9"/></svg>
                </span>
              </button>
              <button
                className={`checkout__method ${payMethod === 'paypal' ? 'checkout__method--active' : ''}`}
                onClick={() => setPayMethod('paypal')}
              >
                <span className="checkout__method-icon">&#127279;</span>
                <span className="checkout__method-label">PayPal</span>
              </button>
            </div>

            {payMethod === 'card' ? (
              <div className="checkout__form">
                <input
                  className="checkout__input"
                  placeholder="Numéro de carte"
                  value={card.numero}
                  onChange={(e) => setCard({ ...card, numero: e.target.value })}
                  maxLength={19}
                />
                <div className="checkout__row-inputs">
                  <input
                    className="checkout__input"
                    placeholder="MM/AA"
                    value={card.expiration}
                    onChange={(e) => setCard({ ...card, expiration: e.target.value })}
                    maxLength={5}
                  />
                  <input
                    className="checkout__input checkout__input--small"
                    placeholder="CVV"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    maxLength={4}
                  />
                </div>
                <input
                  className="checkout__input"
                  placeholder="Nom du porteur"
                  value={card.porteur}
                  onChange={(e) => setCard({ ...card, porteur: e.target.value })}
                />
                <button
                  className="btn btn-gold checkout__pay"
                  onClick={handleConfirm}
                  disabled={!card.numero || !card.expiration || !card.cvv || !card.porteur}
                >
                  Confirmer le paiement — {total}€
                </button>
              </div>
            ) : (
              <div className="checkout__paypal">
                <button className="checkout__paypal-btn" onClick={handleConfirm}>
                  <svg viewBox="0 0 100 28" className="checkout__paypal-logo">
                    <text x="50" y="20" textAnchor="middle" fill="#003087" fontSize="16" fontWeight="700" fontFamily="Arial, sans-serif">Pay</text>
                    <text x="74" y="20" textAnchor="middle" fill="#009cde" fontSize="16" fontWeight="700" fontFamily="Arial, sans-serif">Pal</text>
                  </svg>
                  Payer {total}€
                </button>
                <p className="checkout__paypal-note">Vous serez redirigé vers PayPal pour finaliser le paiement.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Checkout
