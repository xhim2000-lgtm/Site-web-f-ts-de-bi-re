import { useCallback, useState } from 'react'
import { useCart } from './CartContext'
import { useToast } from './ToastContext'
import ProductModal from './ProductModal'
import { products } from '../data/products'
import './Catalogue.css'

const filters = ['Tous', '5L', '6L', '20L', 'Pro']

function Catalogue() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [addedIds, setAddedIds] = useState(new Set())
  const [openProduct, setOpenProduct] = useState(null)
  const { addItem } = useCart()
  const { showToast } = useToast()

  const handleAdd = useCallback((product, e) => {
    e?.stopPropagation()
    addItem(product)
    setAddedIds((prev) => new Set(prev).add(product.id))
    showToast(`${product.name} ajouté au panier`)
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 1200)
  }, [addItem, showToast])

  const filtered = activeFilter === 'Tous'
    ? products
    : activeFilter === 'Pro'
      ? products.filter((p) => p.category === '20L')
      : products.filter((p) => p.category === activeFilter)

  return (
    <section id="selection" className="catalogue section-padding">
      <div className="container">
        <div className="fade-in">
          <h2 className="section-title">La Sélection FutLocal</h2>
          <p className="section-subtitle">
            Sourcée localement. Livrée professionnellement.
          </p>
        </div>

        <div className="catalogue__filters fade-in">
          {filters.map((f) => (
            <button
              key={f}
              className={`catalogue__filter ${activeFilter === f ? 'catalogue__filter--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="catalogue__grid">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="catalogue__card fade-in"
              onClick={() => setOpenProduct(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setOpenProduct(product) }}
            >
              <div className="catalogue__card-img">
                <img
                  className="catalogue__card-photo"
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  crossOrigin="anonymous"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="catalogue__card-img-overlay" />
                <span className="catalogue__card-region">{product.region}</span>
                <span className="catalogue__card-zoom">Voir la fiche →</span>
              </div>

              <div className="catalogue__card-body">
                <span className="catalogue__card-style">{product.style}</span>
                <h3 className="catalogue__card-name">{product.name}</h3>
                <div className="catalogue__card-meta">
                  <span>{product.volume}</span>
                  <span className="catalogue__card-sep">&middot;</span>
                  <span>{product.abv}</span>
                  <span className="catalogue__card-sep">&middot;</span>
                  <span>IBU {product.ibu}</span>
                </div>
                <div className="catalogue__card-footer">
                  <span className="catalogue__card-price">{product.price}€</span>
                  <button
                    className={`btn catalogue__card-btn ${addedIds.has(product.id) ? 'catalogue__card-btn--added' : 'btn-gold'}`}
                    onClick={(e) => handleAdd(product, e)}
                    disabled={addedIds.has(product.id)}
                  >
                    {addedIds.has(product.id) ? '✓ Ajouté' : 'Ajouter'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openProduct && (
        <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />
      )}
    </section>
  )
}

export default Catalogue
