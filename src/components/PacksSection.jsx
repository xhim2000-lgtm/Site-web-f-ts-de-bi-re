import { useState } from 'react'
import { useCart } from './CartContext'
import { useToast } from './ToastContext'
import { packs } from '../data/packs'
import './PacksSection.css'

function PackVisual({ color }) {
  return <div className={`pack__visual pack__visual--${color}`} aria-hidden />
}

function PacksSection() {
  const [openId, setOpenId] = useState(null)
  const { addItem } = useCart()
  const { showToast } = useToast()
  const current = packs.find((p) => p.id === openId)

  const handleAdd = (pack) => {
    addItem({ id: `pack-${pack.id}`, name: pack.name, volume: 'Pack', price: pack.price })
    showToast(`${pack.name} ajouté au panier`)
    setOpenId(null)
  }

  return (
    <section id="packs" className="packs section-padding">
      <div className="container">
        <div className="packs__head fade-in">
          <span className="packs__kicker">PACKS DÉCOUVERTE</span>
          <h2 className="section-title">Prêts à boire, prêts à offrir</h2>
          <p className="section-subtitle">Des sélections clé en main, pensées pour les bonnes occasions.</p>
        </div>

        <div className="packs__grid">
          {packs.map((pack) => {
            const economie = pack.priceBefore - pack.price
            return (
              <article key={pack.id} className="pack fade-in">
                <PackVisual color={pack.color} />
                <span className="pack__save">ÉCONOMISEZ {economie}€</span>
                <div className="pack__body">
                  <h3 className="pack__name">{pack.name}</h3>
                  <p className="pack__tagline">{pack.tagline}</p>
                  <ul className="pack__contents">
                    {pack.contents.slice(0, 3).map((c) => <li key={c}>{c}</li>)}
                  </ul>
                  <div className="pack__footer">
                    <div className="pack__pricing">
                      <span className="pack__price">{pack.price}€</span>
                      <span className="pack__price-before">{pack.priceBefore}€</span>
                    </div>
                    <button className="btn btn-outline-gold pack__btn" onClick={() => setOpenId(pack.id)}>
                      Découvrir
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {current && (
        <div className="pack-overlay" onClick={(e) => { if (e.currentTarget === e.target) setOpenId(null) }}>
          <div className="pack-modal">
            <button className="pack-modal__close" onClick={() => setOpenId(null)} aria-label="Fermer">&times;</button>
            <div className={`pack-modal__hero pack__visual--${current.color}`}>
              <span className="pack-modal__save">ÉCONOMISEZ {current.priceBefore - current.price}€</span>
            </div>
            <div className="pack-modal__body">
              <span className="packs__kicker">PACK DÉCOUVERTE</span>
              <h3 className="pack-modal__name">{current.name}</h3>
              <p className="pack-modal__desc">{current.description}</p>

              <h4 className="pack-modal__subtitle">Contenu du pack</h4>
              <ul className="pack-modal__contents">
                {current.contents.map((c) => <li key={c}>{c}</li>)}
              </ul>

              <div className="pack-modal__footer">
                <div className="pack__pricing">
                  <span className="pack__price">{current.price}€</span>
                  <span className="pack__price-before">{current.priceBefore}€</span>
                </div>
                <button className="btn btn-gold pack-modal__add" onClick={() => handleAdd(current)}>
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PacksSection
