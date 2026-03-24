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
              <img
                className="histoire__photo"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Cuves inox d'une brasserie artisanale française"
                loading="lazy"
                crossOrigin="anonymous"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <div className="histoire__vignette" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Histoire
