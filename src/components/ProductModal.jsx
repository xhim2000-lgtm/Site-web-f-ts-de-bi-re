import { useEffect, useRef, useState } from 'react'
import { useCart } from './CartContext'
import { useDeliveryZone } from './DeliveryZoneContext'
import { useToast } from './ToastContext'
import './ProductModal.css'

const IBU_MAX = 100

function ProductModal({ product, onClose }) {
  const { addItem } = useCart()
  const { zone, openZoneModal } = useDeliveryZone()
  const { showToast } = useToast()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')
  const overlayRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!product) return null

  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i += 1) addItem(product)
    showToast(`${qty} × ${product.name} ajouté${qty > 1 ? 's' : ''} au panier`)
    onClose()
  }

  return (
    <div ref={overlayRef} className="pdp-overlay" onClick={handleOverlay}>
      <div className="pdp-modal">
        <button className="pdp-modal__close" onClick={onClose} aria-label="Fermer">&times;</button>

        <div className="pdp-modal__grid">
          {/* Left: visual */}
          <div className="pdp-modal__visual">
            <img
              className="pdp-modal__img"
              src={product.image}
              alt={product.alt}
              loading="lazy"
              crossOrigin="anonymous"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="pdp-modal__visual-gradient" />
            <span className="pdp-modal__region">{product.region}</span>
          </div>

          {/* Right: info */}
          <div className="pdp-modal__info">
            <span className="pdp-modal__style">{product.style}</span>
            <h2 className="pdp-modal__name">{product.name}</h2>
            <div className="pdp-modal__meta">
              <span>{product.volume}</span>
              <span>·</span>
              <span>{product.abv}</span>
              <span>·</span>
              <span>IBU {product.ibu}</span>
            </div>

            <p className="pdp-modal__price">{product.price}€</p>

            {/* Tasting profile */}
            <div className="pdp-modal__tasting">
              <div className="pdp-modal__tasting-row">
                <span className="pdp-modal__tasting-label">Amertume</span>
                <div className="pdp-modal__ibu-bar">
                  <div className="pdp-modal__ibu-fill" style={{ width: `${(product.ibu / IBU_MAX) * 100}%` }} />
                </div>
                <span className="pdp-modal__tasting-val">{product.ibu}/100</span>
              </div>
              <div className="pdp-modal__tasting-row">
                <span className="pdp-modal__tasting-label">Robe</span>
                <span className="pdp-modal__tasting-val">{product.robe}</span>
              </div>
              <div className="pdp-modal__tasting-row pdp-modal__tasting-row--col">
                <span className="pdp-modal__tasting-label">Arômes</span>
                <div className="pdp-modal__aromes">
                  {product.aromes.map((a) => (
                    <span key={a} className="pdp-modal__arome">{a}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="pdp-modal__tabs">
              <button
                className={`pdp-modal__tab ${tab === 'description' ? 'pdp-modal__tab--active' : ''}`}
                onClick={() => setTab('description')}
              >Description</button>
              <button
                className={`pdp-modal__tab ${tab === 'brasserie' ? 'pdp-modal__tab--active' : ''}`}
                onClick={() => setTab('brasserie')}
              >La brasserie</button>
              <button
                className={`pdp-modal__tab ${tab === 'accords' ? 'pdp-modal__tab--active' : ''}`}
                onClick={() => setTab('accords')}
              >Accords</button>
              <button
                className={`pdp-modal__tab ${tab === 'caracs' ? 'pdp-modal__tab--active' : ''}`}
                onClick={() => setTab('caracs')}
              >Caractéristiques</button>
            </div>

            <div className="pdp-modal__tab-body">
              {tab === 'description' && (
                <p className="pdp-modal__desc">{product.description}</p>
              )}
              {tab === 'brasserie' && (
                <div className="pdp-modal__brasserie">
                  <p className="pdp-modal__brasserie-name">{product.brasserie.nom}</p>
                  <p className="pdp-modal__brasserie-loc">
                    {product.brasserie.ville} · Fondée en {product.brasserie.annee}
                  </p>
                </div>
              )}
              {tab === 'accords' && (
                <div className="pdp-modal__accords">
                  <p className="pdp-modal__small-title">Accords mets-bières</p>
                  <ul className="pdp-modal__list">
                    {product.accords.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                  <p className="pdp-modal__small-title">Idéale pour</p>
                  <ul className="pdp-modal__list">
                    {product.occasions.map((o) => <li key={o}>{o}</li>)}
                  </ul>
                </div>
              )}
              {tab === 'caracs' && (
                <ul className="pdp-modal__specs">
                  <li><strong>ABV</strong> <span>{product.abv}</span></li>
                  <li><strong>IBU</strong> <span>{product.ibu}</span></li>
                  <li><strong>Robe</strong> <span>{product.robe}</span></li>
                  <li><strong>Malts</strong> <span>{product.malts}</span></li>
                  <li><strong>Levure</strong> <span>{product.levure}</span></li>
                  <li><strong>Garde après ouverture</strong> <span>30 jours sous CO₂</span></li>
                </ul>
              )}
            </div>

            {/* Zone check */}
            <div className="pdp-modal__zone">
              <button className="pdp-modal__zone-btn" onClick={openZoneModal}>
                📍 {zone ? `Livré ${zone.eta} chez vous (${zone.label})` : 'Vérifier ma zone de livraison'}
              </button>
            </div>

            {/* Qty + add */}
            <div className="pdp-modal__add">
              <div className="pdp-modal__qty">
                <button className="pdp-modal__qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="pdp-modal__qty-val">{qty}</span>
                <button className="pdp-modal__qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className="btn btn-gold pdp-modal__add-btn" onClick={handleAdd}>
                Ajouter au panier · {qty * product.price}€
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
