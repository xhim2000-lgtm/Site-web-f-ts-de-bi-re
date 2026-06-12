import { useEffect, useMemo, useState } from 'react'
import { useCart } from './CartContext'
import { useToast } from './ToastContext'
import ProductModal from './ProductModal'
import { products } from '../data/products'
import './CataloguePage.css'

const STYLE_FILTERS = ['Blonde', 'Blanche', 'Ambrée', 'IPA', 'Stout', 'Saison', 'Lager', 'Low/No alcohol']
const FORMAT_FILTERS = ['5L', '6L', '20L']
const REGION_FILTERS = [
  'Alsace', 'Bretagne', 'Normandie', 'Sud-Ouest', 'Provence',
  'Île-de-France', 'Hauts-de-France', 'Auvergne-Rhône-Alpes',
]

const ABV_MIN = 0
const ABV_MAX = 8
const PRICE_MIN = 25
const PRICE_MAX = 130

const DEFAULT_FILTERS = () => ({
  styles: new Set(),
  formats: new Set(),
  regions: new Set(),
  abvMin: ABV_MIN,
  abvMax: ABV_MAX,
  priceMin: PRICE_MIN,
  priceMax: PRICE_MAX,
})

function toggle(set, value) {
  const next = new Set(set)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}

function CataloguePage({ onClose }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState('popularity')
  const [view, setView] = useState('grid')
  const [openProduct, setOpenProduct] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false) // mobile
  const { addItem } = useCart()
  const { showToast } = useToast()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => { document.body.style.overflow = '' }
  }, [])

  const filtered = useMemo(() => {
    let out = products.filter((p) => {
      if (filters.styles.size > 0 && !filters.styles.has(p.styleCategory)) return false
      if (filters.formats.size > 0 && !filters.formats.has(p.volume)) return false
      if (filters.regions.size > 0 && !filters.regions.has(p.region)) return false
      if (p.abvNum < filters.abvMin || p.abvNum > filters.abvMax) return false
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false
      return true
    })
    const sortFns = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'popularity': (a, b) => b.popularity - a.popularity,
      'new': (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id,
    }
    return [...out].sort(sortFns[sort])
  }, [filters, sort])

  const handleAdd = (product, e) => {
    e?.stopPropagation()
    addItem(product)
    showToast(`${product.name} ajouté au panier`)
  }

  const reset = () => setFilters(DEFAULT_FILTERS())

  const activeFiltersCount =
    filters.styles.size + filters.formats.size + filters.regions.size +
    (filters.abvMin > ABV_MIN || filters.abvMax < ABV_MAX ? 1 : 0) +
    (filters.priceMin > PRICE_MIN || filters.priceMax < PRICE_MAX ? 1 : 0)

  return (
    <div className="catpage">
      {/* Hero */}
      <header className="catpage__hero">
        <div className="container">
          <button className="catpage__back" onClick={onClose} aria-label="Retour">
            ← Retour au site
          </button>
          <h1 className="catpage__title">Notre catalogue</h1>
          <p className="catpage__sub">
            Plus de 50 brasseries artisanales françaises, soigneusement sélectionnées.
          </p>
        </div>
      </header>

      <div className="container catpage__wrap">
        {/* Mobile filter trigger */}
        <button
          className="catpage__mobile-filter-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
          Filtres {activeFiltersCount > 0 && <span className="catpage__mobile-filter-badge">{activeFiltersCount}</span>}
        </button>

        <div className="catpage__layout">
          {/* Sidebar */}
          <aside className={`catpage__filters ${sidebarOpen ? 'catpage__filters--open' : ''}`}>
            <div className="catpage__filters-head">
              <h3 className="catpage__filters-title">Filtres</h3>
              <button className="catpage__filters-close" onClick={() => setSidebarOpen(false)} aria-label="Fermer">&times;</button>
            </div>

            <FilterGroup title="Style">
              {STYLE_FILTERS.map((s) => (
                <CheckboxItem
                  key={s}
                  label={s}
                  checked={filters.styles.has(s)}
                  onChange={() => setFilters((f) => ({ ...f, styles: toggle(f.styles, s) }))}
                />
              ))}
            </FilterGroup>

            <FilterGroup title="Format">
              {FORMAT_FILTERS.map((s) => (
                <CheckboxItem
                  key={s}
                  label={s}
                  checked={filters.formats.has(s)}
                  onChange={() => setFilters((f) => ({ ...f, formats: toggle(f.formats, s) }))}
                />
              ))}
            </FilterGroup>

            <FilterGroup title="Région">
              {REGION_FILTERS.map((s) => (
                <CheckboxItem
                  key={s}
                  label={s}
                  checked={filters.regions.has(s)}
                  onChange={() => setFilters((f) => ({ ...f, regions: toggle(f.regions, s) }))}
                />
              ))}
            </FilterGroup>

            <FilterGroup title="ABV (alcool)">
              <DoubleRange
                min={ABV_MIN}
                max={ABV_MAX}
                step={0.5}
                lo={filters.abvMin}
                hi={filters.abvMax}
                onChange={(lo, hi) => setFilters((f) => ({ ...f, abvMin: lo, abvMax: hi }))}
                format={(v) => `${v}%`}
              />
            </FilterGroup>

            <FilterGroup title="Prix">
              <DoubleRange
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={1}
                lo={filters.priceMin}
                hi={filters.priceMax}
                onChange={(lo, hi) => setFilters((f) => ({ ...f, priceMin: lo, priceMax: hi }))}
                format={(v) => `${v}€`}
              />
            </FilterGroup>

            <button className="catpage__reset" onClick={reset}>Réinitialiser les filtres</button>
          </aside>

          {/* Sidebar overlay (mobile) */}
          {sidebarOpen && (
            <div className="catpage__sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Results */}
          <section className="catpage__results">
            <div className="catpage__toolbar">
              <p className="catpage__count">
                <strong>{filtered.length}</strong> bière{filtered.length > 1 ? 's' : ''} affichée{filtered.length > 1 ? 's' : ''}
                <span className="catpage__count-of"> sur {products.length} référence{products.length > 1 ? 's' : ''} partenaires</span>
              </p>

              <div className="catpage__toolbar-actions">
                <div className="catpage__sort">
                  <label htmlFor="cat-sort">Tri</label>
                  <select id="cat-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="popularity">Popularité</option>
                    <option value="price-asc">Prix ↑</option>
                    <option value="price-desc">Prix ↓</option>
                    <option value="new">Nouveautés</option>
                  </select>
                </div>

                <div className="catpage__view">
                  <button
                    className={`catpage__view-btn ${view === 'grid' ? 'catpage__view-btn--active' : ''}`}
                    onClick={() => setView('grid')}
                    aria-label="Vue grille"
                    title="Vue grille"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                  </button>
                  <button
                    className={`catpage__view-btn ${view === 'list' ? 'catpage__view-btn--active' : ''}`}
                    onClick={() => setView('list')}
                    aria-label="Vue liste"
                    title="Vue liste"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="3" rx="1"/><rect x="3" y="10.5" width="18" height="3" rx="1"/><rect x="3" y="17" width="18" height="3" rx="1"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="catpage__empty">
                <span className="catpage__empty-icon">🔍</span>
                <h3>Aucune bière ne correspond à ces critères.</h3>
                <p>Essayez d'élargir votre sélection.</p>
                <button className="btn btn-outline-gold" onClick={reset}>Réinitialiser les filtres</button>
              </div>
            ) : view === 'grid' ? (
              <div className="catpage__grid">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onOpen={() => setOpenProduct(product)} onAdd={handleAdd} />
                ))}
              </div>
            ) : (
              <ul className="catpage__list">
                {filtered.map((product) => (
                  <ProductRow key={product.id} product={product} onOpen={() => setOpenProduct(product)} onAdd={handleAdd} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>

      {openProduct && (
        <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />
      )}
    </div>
  )
}

function FilterGroup({ title, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="catpage__group">
      <button className="catpage__group-head" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className={`catpage__group-caret ${open ? 'catpage__group-caret--open' : ''}`}>▾</span>
      </button>
      {open && <div className="catpage__group-body">{children}</div>}
    </div>
  )
}

function CheckboxItem({ label, checked, onChange }) {
  return (
    <label className="catpage__check">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="catpage__check-box" />
      <span className="catpage__check-label">{label}</span>
    </label>
  )
}

function DoubleRange({ min, max, step, lo, hi, onChange, format }) {
  const range = max - min
  const loPct = ((lo - min) / range) * 100
  const hiPct = ((hi - min) / range) * 100

  return (
    <div className="catpage__range">
      <div className="catpage__range-track">
        <div className="catpage__range-fill" style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }} />
      </div>
      <input
        className="catpage__range-input catpage__range-input--lo"
        type="range"
        min={min}
        max={max}
        step={step}
        value={lo}
        onChange={(e) => {
          const v = Math.min(parseFloat(e.target.value), hi - step)
          onChange(v, hi)
        }}
      />
      <input
        className="catpage__range-input catpage__range-input--hi"
        type="range"
        min={min}
        max={max}
        step={step}
        value={hi}
        onChange={(e) => {
          const v = Math.max(parseFloat(e.target.value), lo + step)
          onChange(lo, v)
        }}
      />
      <div className="catpage__range-values">
        <span>{format(lo)}</span>
        <span>{format(hi)}</span>
      </div>
    </div>
  )
}

function ProductCard({ product, onOpen, onAdd }) {
  return (
    <article
      className="catpage__card"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen() }}
    >
      <div className="catpage__card-img">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          crossOrigin="anonymous"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="catpage__card-overlay" />
        <span className="catpage__card-region">{product.region}</span>
        {product.badge && <span className="catpage__card-badge">{product.badge}</span>}
        {product.isNew && !product.badge && <span className="catpage__card-new">NOUVEAU</span>}
      </div>
      <div className="catpage__card-body">
        <span className="catpage__card-style">{product.style}</span>
        <h3 className="catpage__card-name">{product.name}</h3>
        <div className="catpage__card-meta">
          <span>{product.volume}</span><span>·</span><span>{product.abv}</span><span>·</span><span>IBU {product.ibu}</span>
        </div>
        <div className="catpage__card-foot">
          <span className="catpage__card-price">{product.price}€</span>
          <button className="btn btn-gold catpage__card-btn" onClick={(e) => onAdd(product, e)}>
            Ajouter
          </button>
        </div>
      </div>
    </article>
  )
}

function ProductRow({ product, onOpen, onAdd }) {
  return (
    <li
      className="catpage__row"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen() }}
    >
      <div className="catpage__row-img">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          crossOrigin="anonymous"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>
      <div className="catpage__row-info">
        <div className="catpage__row-top">
          <span className="catpage__card-style">{product.style}</span>
          {product.badge && <span className="catpage__card-badge catpage__card-badge--row">{product.badge}</span>}
          {product.isNew && !product.badge && <span className="catpage__card-new catpage__card-new--row">NOUVEAU</span>}
        </div>
        <h3 className="catpage__row-name">{product.name}</h3>
        <p className="catpage__row-brasserie">{product.brasserie.nom} — {product.region}</p>
        <div className="catpage__row-meta">
          <span>{product.volume}</span><span>·</span><span>{product.abv}</span><span>·</span><span>IBU {product.ibu}</span><span>·</span><span>{product.robe}</span>
        </div>
      </div>
      <div className="catpage__row-side">
        <span className="catpage__row-price">{product.price}€</span>
        <button className="btn btn-gold catpage__row-btn" onClick={(e) => onAdd(product, e)}>
          Ajouter
        </button>
      </div>
    </li>
  )
}

export default CataloguePage
