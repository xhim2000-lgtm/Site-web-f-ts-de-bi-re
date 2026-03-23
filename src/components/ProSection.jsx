import './ProSection.css'

const benefits = [
  {
    icon: '\u26A1',
    title: 'Livraison J+1',
    desc: 'Zéro rupture de stock, zéro stress.',
  },
  {
    icon: '\uD83D\uDD13',
    title: 'Zéro verrouillage',
    desc: 'Fûts inox standard. Votre matériel reste le vôtre.',
  },
  {
    icon: '\uD83D\uDCB0',
    title: 'Tarifs dégressifs',
    desc: 'Jusqu\u2019à -20% selon les volumes. Transparence totale.',
  },
]

const pricing = [
  { range: '1\u20135 fûts', discount: 'Prix catalogue', highlight: false },
  { range: '6\u201315 fûts', discount: '-10%', highlight: true },
  { range: '16+ fûts', discount: '-20%', highlight: true },
]

const partners = ['Météor', 'BAPBAP', 'Brasserie du Mont Blanc', 'La Parisienne', 'Gallia', 'Ninkasi']

function ProSection() {
  return (
    <section id="pros" className="pro section-padding">
      <div className="container">
        <div className="pro__header fade-in">
          <span className="pro__badge">POUR LES PROFESSIONNELS</span>
          <h2 className="section-title">
            Arrêtez de subir votre<br />approvisionnement.
          </h2>
        </div>

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
              <span>Volume</span>
              <span>Remise</span>
            </div>
            {pricing.map((row, i) => (
              <div
                key={i}
                className={`pro__pricing-row ${row.highlight ? 'pro__pricing-row--highlight' : ''}`}
              >
                <span>{row.range}</span>
                <span className="pro__pricing-discount">{row.discount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pro__cta fade-in">
          <a href="#contact" className="btn btn-gold btn--large">
            Demander un devis pro
          </a>
        </div>

        <div className="pro__partners fade-in">
          <p className="pro__partners-label">Ils nous font confiance</p>
          <div className="pro__partners-list">
            {partners.map((name) => (
              <span key={name} className="pro__partner">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProSection
