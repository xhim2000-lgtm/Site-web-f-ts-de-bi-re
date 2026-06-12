import { useMemo, useState } from 'react'
import { useCart } from './CartContext'
import { useToast } from './ToastContext'
import { products } from '../data/products'
import './EventCalculator.css'

const EVENT_TYPES = [
  { value: 'mariage', label: 'Mariage' },
  { value: 'anniversaire', label: 'Anniversaire' },
  { value: 'barbecue', label: 'Barbecue' },
  { value: 'pro', label: 'Soirée pro' },
  { value: 'festival', label: 'Festival' },
  { value: 'autre', label: 'Autre' },
]

const PROFILES = [
  { value: 'craft', label: 'Amateurs craft' },
  { value: 'public', label: 'Grand public' },
  { value: 'mixte', label: 'Mixte' },
]

// Calcul de la sélection recommandée pour un volume donné et un profil
function recommend(volumeL, profil) {
  const pool = products.filter((p) => {
    if (profil === 'craft') return p.profil === 'craft' || p.profil === 'mixte'
    if (profil === 'public') return p.profil === 'public' || p.profil === 'mixte'
    return true
  })

  // Trie : pour <30L on prend les petits formats, pour >80L les 20L en priorité
  const byVol = (a, b) => parseInt(a.volume) - parseInt(b.volume)
  const sorted = volumeL > 80
    ? [...pool].sort((a, b) => parseInt(b.volume) - parseInt(a.volume))
    : volumeL < 30
      ? [...pool].sort(byVol)
      : [...pool].sort((a, b) => Math.abs(parseInt(a.volume) - 10) - Math.abs(parseInt(b.volume) - 10))

  const lignes = []
  let restant = volumeL
  let i = 0
  let safety = 0

  while (restant > 0.5 && sorted.length > 0 && safety < 20) {
    const p = sorted[i % sorted.length]
    const vol = parseInt(p.volume)
    if (vol > restant + 2 && volumeL > 5) {
      // si on dépasse trop, on essaie le format suivant
      i += 1
      safety += 1
      if (i > sorted.length * 2) break
      continue
    }
    const existing = lignes.find((l) => l.id === p.id)
    if (existing) existing.qty += 1
    else lignes.push({ ...p, qty: 1 })
    restant -= vol
    i += 1
    safety += 1
  }

  return lignes
}

function EventCalculator() {
  const [step, setStep] = useState(1)
  const [type, setType] = useState('barbecue')
  const [invites, setInvites] = useState(80)
  const [duree, setDuree] = useState(4)
  const [pctBuveurs, setPctBuveurs] = useState(70)
  const [profil, setProfil] = useState('craft')

  const { addItem } = useCart()
  const { showToast } = useToast()

  const volumeTotal = useMemo(() => {
    return Math.round(invites * (pctBuveurs / 100) * duree * 0.4)
  }, [invites, duree, pctBuveurs])

  const reco = useMemo(() => recommend(volumeTotal, profil), [volumeTotal, profil])
  const totalReco = reco.reduce((s, l) => s + l.price * l.qty, 0)

  const addAllToCart = () => {
    reco.forEach((l) => {
      for (let n = 0; n < l.qty; n += 1) addItem(l)
    })
    const totalFuts = reco.reduce((s, l) => s + l.qty, 0)
    showToast(`✓ ${totalFuts} fût${totalFuts > 1 ? 's' : ''} ajouté${totalFuts > 1 ? 's' : ''} au panier`)
  }

  return (
    <section id="evenement" className="evcalc section-padding">
      <div className="container">
        <div className="evcalc__head fade-in">
          <span className="evcalc__kicker">CALCULATEUR ÉVÉNEMENTIEL</span>
          <h2 className="section-title">Vous organisez un événement ?</h2>
          <p className="section-subtitle">En 3 étapes, recevez une recommandation sur-mesure.</p>
        </div>

        <div className="evcalc__wrap fade-in">
          <div className="evcalc__steps">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`evcalc__step ${step === n ? 'evcalc__step--active' : ''} ${step > n ? 'evcalc__step--done' : ''}`}
                onClick={() => setStep(n)}
              >
                <span className="evcalc__step-num">{n}</span>
                <span className="evcalc__step-label">
                  {n === 1 ? 'Votre événement' : n === 2 ? 'Vos invités' : 'Résultat'}
                </span>
              </button>
            ))}
          </div>

          <div className="evcalc__panel">
            {step === 1 && (
              <>
                <div className="evcalc__field">
                  <label className="evcalc__label">Type d'événement</label>
                  <div className="evcalc__chips">
                    {EVENT_TYPES.map((t) => (
                      <button
                        key={t.value}
                        className={`evcalc__chip ${type === t.value ? 'evcalc__chip--active' : ''}`}
                        onClick={() => setType(t.value)}
                      >{t.label}</button>
                    ))}
                  </div>
                </div>

                <div className="evcalc__field">
                  <label className="evcalc__label">Nombre d'invités · <strong>{invites}</strong></label>
                  <input type="range" min="10" max="300" step="5" value={invites} onChange={(e) => setInvites(+e.target.value)} className="evcalc__slider" />
                  <div className="evcalc__slider-bounds"><span>10</span><span>300</span></div>
                </div>

                <div className="evcalc__field">
                  <label className="evcalc__label">Durée · <strong>{duree}h</strong></label>
                  <input type="range" min="2" max="12" step="1" value={duree} onChange={(e) => setDuree(+e.target.value)} className="evcalc__slider" />
                  <div className="evcalc__slider-bounds"><span>2h</span><span>12h</span></div>
                </div>

                <button className="btn btn-gold evcalc__next" onClick={() => setStep(2)}>Continuer →</button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="evcalc__field">
                  <label className="evcalc__label">% de buveurs de bière · <strong>{pctBuveurs}%</strong></label>
                  <input type="range" min="30" max="100" step="5" value={pctBuveurs} onChange={(e) => setPctBuveurs(+e.target.value)} className="evcalc__slider" />
                  <div className="evcalc__slider-bounds"><span>30%</span><span>100%</span></div>
                </div>

                <div className="evcalc__field">
                  <label className="evcalc__label">Profil dominant</label>
                  <div className="evcalc__chips">
                    {PROFILES.map((p) => (
                      <button
                        key={p.value}
                        className={`evcalc__chip ${profil === p.value ? 'evcalc__chip--active' : ''}`}
                        onClick={() => setProfil(p.value)}
                      >{p.label}</button>
                    ))}
                  </div>
                </div>

                <div className="evcalc__nav">
                  <button className="btn btn-outline evcalc__back" onClick={() => setStep(1)}>← Retour</button>
                  <button className="btn btn-gold evcalc__next" onClick={() => setStep(3)}>Voir le résultat →</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="evcalc__result">
                  <p className="evcalc__result-label">Volume total recommandé</p>
                  <p className="evcalc__result-volume">{volumeTotal} L</p>
                  <p className="evcalc__result-detail">
                    Pour {invites} invités · {duree}h · {pctBuveurs}% buveurs · profil {profil === 'craft' ? 'craft' : profil === 'public' ? 'grand public' : 'mixte'}
                  </p>
                </div>

                <h4 className="evcalc__reco-title">Pour votre événement, on vous recommande :</h4>
                <div className="evcalc__reco-grid">
                  {reco.map((l) => (
                    <div key={l.id} className="evcalc__reco-card">
                      <div className="evcalc__reco-qty">×{l.qty}</div>
                      <div className="evcalc__reco-body">
                        <span className="evcalc__reco-style">{l.style}</span>
                        <p className="evcalc__reco-name">{l.name}</p>
                        <p className="evcalc__reco-meta">{l.volume} · {l.region}</p>
                        <p className="evcalc__reco-price">{l.price * l.qty}€</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="evcalc__total">
                  <span>Total estimé</span>
                  <strong>{totalReco}€</strong>
                </div>

                <div className="evcalc__nav">
                  <button className="btn btn-outline evcalc__back" onClick={() => setStep(2)}>← Modifier</button>
                  <button className="btn btn-gold evcalc__next" onClick={addAllToCart}>
                    Ajouter ce panier
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventCalculator
