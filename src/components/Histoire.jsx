import { useCallback } from 'react'
import './Histoire.css'

const values = [
  { label: 'Local', desc: 'Circuit court, brasseries de terroir.' },
  { label: 'Circulaire', desc: 'Fûts 100% réutilisables, 100 cycles.' },
  { label: 'Agile', desc: 'Logistique mutualisée bas carbone.' },
]

/* Images de brasserie/fûts classées par priorité */
const HISTOIRE_IMAGES = [
  'https://images.unsplash.com/photo-1559818488-a7e152b1e88e?w=800&q=80',
  'https://images.unsplash.com/photo-1571414229546-14d8f96cf9c8?w=800&q=80',
  'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=800&q=80',
  'https://images.unsplash.com/photo-1445476755903-fd6c3df63afc?w=800&q=80',
]

function Histoire() {
  const handleImgError = useCallback((e) => {
    const img = e.target
    const current = img.getAttribute('src')
    const idx = HISTOIRE_IMAGES.indexOf(current)
    const next = HISTOIRE_IMAGES[idx + 1]
    if (next) {
      img.setAttribute('src', next)
    } else {
      img.style.display = 'none'
    }
  }, [])

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
                src={HISTOIRE_IMAGES[0]}
                alt="Cuves inox d'une brasserie artisanale française"
                loading="lazy"
                crossOrigin="anonymous"
                onError={handleImgError}
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
