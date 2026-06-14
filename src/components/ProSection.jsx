import { useState } from 'react'
import QuickOrder from './QuickOrder'
import { commerciaux, testimonialsPro, legalInfo } from '../data/account'
import './ProSection.css'

const benefits = [
  { icon: '⚡', title: 'Livraison J+1', desc: 'Zéro rupture de stock, zéro stress.' },
  { icon: '🔓', title: 'Zéro verrouillage', desc: 'Fûts inox standard. Votre matériel reste le vôtre.' },
  { icon: '💰', title: 'Tarifs dégressifs', desc: 'Jusqu’à -20% selon les volumes. Transparence totale.' },
]

const pricing = [
  { range: '1–5 fûts', discount: 'Prix catalogue', highlight: false },
  { range: '6–15 fûts', discount: '-10%', highlight: true },
  { range: '16+ fûts', discount: '-20%', highlight: true },
]

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function ProSection() {
  const [tab, setTab] = useState('overview')

  return (
    <section id="pros" className="pro section-padding">
      <div className="pro__bg">
        <img
          className="pro__bg-img"
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=70&auto=format&fit=crop"
          alt="Bar professionnel avec tireuses à bière"
          loading="lazy"
          crossOrigin="anonymous"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>
      <div className="container">
        <div className="pro__header fade-in">
          <span className="pro__badge">POUR LES PROFESSIONNELS</span>
          <h2 className="section-title">
            Arrêtez de subir votre<br />approvisionnement.
          </h2>
        </div>

        {/* Tabs */}
        <div className="pro__tabs fade-in">
          <button
            className={`pro__tab ${tab === 'overview' ? 'pro__tab--active' : ''}`}
            onClick={() => setTab('overview')}
          >Vue d'ensemble</button>
          <button
            className={`pro__tab ${tab === 'qorder' ? 'pro__tab--active' : ''}`}
            onClick={() => setTab('qorder')}
          >Commande rapide</button>
        </div>

        {tab === 'overview' && (
          <>
            <div className="pro__benefits">
              {benefits.map((b, i) => (
                <div key={i} className="pro__benefit fade-in">
                  <span className="pro__benefit-icon">{b.icon}</span>
                  <h3 className="pro__benefit-title">{b.title}</h3>
                  <p className="pro__benefit-desc">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="pro__pricing fade-in">
              <h3 className="pro__pricing-title">Grille tarifaire B2B</h3>
              <div className="pro__pricing-table">
                <div className="pro__pricing-header">
                  <span>Volume</span><span>Remise</span>
                </div>
                {pricing.map((row, i) => (
                  <div key={i} className={`pro__pricing-row ${row.highlight ? 'pro__pricing-row--highlight' : ''}`}>
                    <span>{row.range}</span>
                    <span className="pro__pricing-discount">{row.discount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interlocuteurs dédiés */}
            <div className="pro__reps fade-in">
              <h3 className="pro__reps-title">Votre interlocuteur dédié</h3>
              <div className="pro__reps-grid">
                {commerciaux.map((c) => (
                  <div key={c.email} className="pro__rep">
                    <div className="pro__rep-avatar">{c.initiales}</div>
                    <p className="pro__rep-name">{c.nom}</p>
                    <p className="pro__rep-role">{c.role}</p>
                    <a href={`mailto:${c.email}`} className="pro__rep-email">{c.email}</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Témoignages */}
            <div className="pro__testimonials fade-in">
              <h3 className="pro__reps-title">Ils nous ont fait confiance</h3>
              <div className="pro__testimonials-grid">
                {testimonialsPro.map((t, i) => (
                  <blockquote key={i} className="pro__testimonial">
                    <div className="pro__stars">
                      {[0, 1, 2, 3, 4].map((s) => <Star key={s} />)}
                    </div>
                    <p className="pro__testimonial-text">« {t.texte} »</p>
                    <footer className="pro__testimonial-author">
                      <strong>{t.auteur}</strong>
                      <span>{t.role}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            <div className="pro__cta fade-in">
              <a href="#contact" className="btn btn-gold btn--large">Demander un devis pro</a>
            </div>

            {/* Coordonnées légales */}
            <div className="pro__legal fade-in">
              <span className="pro__legal-title">Coordonnées légales</span>
              <ul className="pro__legal-list">
                <li><strong>SIRET</strong> <span>{legalInfo.siret}</span></li>
                <li><strong>TVA intra.</strong> <span>{legalInfo.tva}</span></li>
                <li><strong>Capital social</strong> <span>{legalInfo.capital}</span></li>
                <li><strong>Siège</strong> <span>{legalInfo.siege}</span></li>
                <li><strong>Licence</strong> <span>{legalInfo.licence}</span></li>
              </ul>
            </div>
          </>
        )}

        {tab === 'qorder' && (
          <div className="pro__qorder-wrap fade-in">
            <QuickOrder />
            <p className="pro__qorder-note">
              💡 Connectée à votre commerciale Mélinda UBEDA — temps de validation moyen : 2h ouvrées.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProSection
