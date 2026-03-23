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
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&q=80&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&q=80&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&q=80&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&h=300&q=80&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=400&h=300&q=80&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=400&h=300&q=80&auto=format&fit=crop',
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
              <div className="catalogue__card-img">
                <img
                  className="catalogue__card-photo"
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
                <div className="catalogue__card-img-overlay" />
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
