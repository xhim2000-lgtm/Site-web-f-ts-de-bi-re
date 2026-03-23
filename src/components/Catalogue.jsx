import { useState } from 'react'
import './Catalogue.css'

const products = [
  {
    id: 1,
    name: 'Blonde Légère Alsacienne',
    style: 'Blonde',
    region: 'Alsace',
    volume: '5L',
    price: 29,
    abv: '4,5%',
    category: '5L',
  },
  {
    id: 2,
    name: 'IPA Fruitée Bretonne',
    style: 'IPA',
    region: 'Bretagne',
    volume: '5L',
    price: 33,
    abv: '6%',
    category: '5L',
  },
  {
    id: 3,
    name: 'Stout Chocolatée Normande',
    style: 'Stout',
    region: 'Normandie',
    volume: '5L',
    price: 35,
    abv: '5,5%',
    category: '5L',
  },
  {
    id: 4,
    name: 'Ambrée Caramélisée',
    style: 'Ambrée',
    region: 'Sud-Ouest',
    volume: '6L',
    price: 39,
    abv: '5%',
    category: '6L',
  },
  {
    id: 5,
    name: 'Lager Classique Parisienne',
    style: 'Lager',
    region: 'Paris',
    volume: '20L',
    price: 95,
    abv: '4,7%',
    category: '20L',
  },
  {
    id: 6,
    name: 'Saison Herbacée Provençale',
    style: 'Saison',
    region: 'Provence',
    volume: '20L',
    price: 110,
    abv: '6,5%',
    category: '20L',
  },
]

const filters = ['Tous', '5L', '6L', '20L', 'Pro']

function Catalogue() {
  const [activeFilter, setActiveFilter] = useState('Tous')

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
            <div key={product.id} className="catalogue__card fade-in">
              {/* Placeholder image */}
              <div className="catalogue__card-img">
                <div className="catalogue__card-img-inner">
                  <svg viewBox="0 0 120 160" fill="none" className="catalogue__card-svg">
                    <rect x="40" y="20" width="40" height="100" rx="4" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
                    <ellipse cx="60" cy="20" rx="20" ry="6" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
                    <line x1="60" y1="14" x2="60" y2="5" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
                    <rect x="50" y="2" width="20" height="6" rx="2" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
                  </svg>
                </div>
                <span className="catalogue__card-region">{product.region}</span>
              </div>

              <div className="catalogue__card-body">
                <span className="catalogue__card-style">{product.style}</span>
                <h3 className="catalogue__card-name">{product.name}</h3>
                <div className="catalogue__card-meta">
                  <span>{product.volume}</span>
                  <span className="catalogue__card-sep">&middot;</span>
                  <span>{product.abv}</span>
                </div>
                <div className="catalogue__card-footer">
                  <span className="catalogue__card-price">{product.price}€</span>
                  <button className="btn btn-gold catalogue__card-btn">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Catalogue
