import './Histoire.css'

const values = [
  { label: 'Local', desc: 'Circuit court, brasseries de terroir.' },
  { label: 'Circulaire', desc: 'Fûts 100% réutilisables, 100 cycles.' },
  { label: 'Agile', desc: 'Logistique mutualisée bas carbone.' },
]

function Histoire() {
  return (
    <section id="histoire" className="histoire section-padding">
      <div className="container">
        <div className="histoire__grid">
          <div className="histoire__text slide-left">
            <h2 className="section-title">
              Une infrastructure.<br />
              Pas juste un distributeur.
            </h2>

            <p className="histoire__desc">
              FutLocal est une plateforme logistique hybride qui libère l'accès à la bière
              artisanale en pression. Nous supprimons les frictions de la consigne,
              connectons les micro-brasseries aux professionnels, et construisons
              l'infrastructure que le marché attendait.
            </p>

            <p className="histoire__desc">
              Notre modèle repose sur des fûts inox standardisés — 100% réutilisables,
              conçus pour 100 cycles minimum. Chaque livraison s'inscrit dans une logistique
              mutualisée bas carbone, pensée pour réduire l'empreinte de chaque pinte servie.
            </p>

            <div className="histoire__values">
              {values.map((v) => (
                <div key={v.label} className="histoire__value">
                  <span className="histoire__value-label">{v.label}</span>
                  <span className="histoire__value-desc">{v.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="histoire__visual slide-right">
            <div className="histoire__placeholder">
              <svg viewBox="0 0 400 500" fill="none" className="histoire__svg">
                {/* Stylized keg illustration */}
                <rect x="120" y="50" width="160" height="350" rx="20" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" />
                <ellipse cx="200" cy="50" rx="80" ry="20" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" />
                <ellipse cx="200" cy="400" rx="80" ry="20" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" />
                <line x1="200" y1="30" x2="200" y2="10" stroke="#C9A84C" strokeWidth="1.5" opacity="0.3" />
                <circle cx="200" cy="8" r="4" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
                {/* Rings */}
                <ellipse cx="200" cy="150" rx="70" ry="8" stroke="#C9A84C" strokeWidth="0.8" opacity="0.15" />
                <ellipse cx="200" cy="300" rx="70" ry="8" stroke="#C9A84C" strokeWidth="0.8" opacity="0.15" />
                {/* Label area */}
                <rect x="150" y="190" width="100" height="70" rx="4" stroke="#C9A84C" strokeWidth="0.8" opacity="0.2" />
                <text x="200" y="220" textAnchor="middle" fill="#C9A84C" fontSize="10" opacity="0.3" fontFamily="serif">FUT</text>
                <text x="200" y="240" textAnchor="middle" fill="#C9A84C" fontSize="10" opacity="0.3" fontFamily="serif">LOCAL</text>
              </svg>

              {/* Ambient glow */}
              <div className="histoire__glow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Histoire
