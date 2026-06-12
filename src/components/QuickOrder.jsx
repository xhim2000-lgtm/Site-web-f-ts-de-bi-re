import { useMemo, useState } from 'react'
import { useCart } from './CartContext'
import { useToast } from './ToastContext'
import { products } from '../data/products'
import './QuickOrder.css'

// Stocks mockés
const STOCKS = {
  1: { label: 'En stock', tone: 'ok' },
  2: { label: 'Stock limité — 8 fûts', tone: 'low' },
  3: { label: 'En stock', tone: 'ok' },
  4: { label: 'En stock', tone: 'ok' },
  5: { label: 'En stock', tone: 'ok' },
  6: { label: 'Stock limité — 5 fûts', tone: 'low' },
}

function tierFor(totalFuts) {
  if (totalFuts >= 16) return { tier: '-20%', discount: 0.2, label: '-20% (16+ fûts)' }
  if (totalFuts >= 6) return { tier: '-10%', discount: 0.1, label: '-10% (6-15 fûts)' }
  return { tier: null, discount: 0, label: null }
}

function QuickOrder() {
  const [qties, setQties] = useState(() => Object.fromEntries(products.map((p) => [p.id, 0])))
  const { addItem } = useCart()
  const { showToast } = useToast()

  // Prix HT mocké : prix TTC / 1.2
  const priceHT = (price) => Math.round(price / 1.2)

  const totalFuts = useMemo(
    () => Object.values(qties).reduce((s, q) => s + q, 0),
    [qties],
  )

  const totalHT = useMemo(
    () => products.reduce((s, p) => s + priceHT(p.price) * (qties[p.id] || 0), 0),
    [qties],
  )

  const tierInfo = tierFor(totalFuts)
  const totalAvecRemise = Math.round(totalHT * (1 - tierInfo.discount))

  const futsManquants = totalFuts < 6 ? 6 - totalFuts : null

  const set = (id, q) => setQties((prev) => ({ ...prev, [id]: Math.max(0, q) }))

  const addAll = () => {
    if (totalFuts === 0) return
    products.forEach((p) => {
      for (let n = 0; n < (qties[p.id] || 0); n += 1) addItem(p)
    })
    showToast(`✓ ${totalFuts} fût${totalFuts > 1 ? 's' : ''} ajouté${totalFuts > 1 ? 's' : ''} au panier. Votre commercial Thomas Bernard sera notifié.`)
    setQties(Object.fromEntries(products.map((p) => [p.id, 0])))
  }

  return (
    <div className="qorder">
      <div className="qorder__head">
        <h3 className="qorder__title">Commande rapide</h3>
        <p className="qorder__sub">Saisie dense, prix HT et remises automatiques.</p>
      </div>

      <div className="qorder__table-wrap">
        <table className="qorder__table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Format</th>
              <th>Prix HT</th>
              <th>Stock</th>
              <th>Quantité</th>
              <th className="qorder__th-right">Sous-total HT</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const stock = STOCKS[p.id]
              const ht = priceHT(p.price)
              const q = qties[p.id] || 0
              return (
                <tr key={p.id} className={q > 0 ? 'qorder__row--active' : ''}>
                  <td>
                    <p className="qorder__pname">{p.name}</p>
                    <p className="qorder__pstyle">{p.style} · {p.region}</p>
                  </td>
                  <td className="qorder__cell-vol">{p.volume}</td>
                  <td className="qorder__cell-price">{ht}€</td>
                  <td>
                    <span className={`qorder__stock qorder__stock--${stock.tone}`}>{stock.label}</span>
                  </td>
                  <td>
                    <div className="qorder__qty">
                      <button className="qorder__qty-btn" onClick={() => set(p.id, q - 1)}>−</button>
                      <input
                        className="qorder__qty-input"
                        type="number"
                        min="0"
                        value={q}
                        onChange={(e) => set(p.id, parseInt(e.target.value) || 0)}
                      />
                      <button className="qorder__qty-btn" onClick={() => set(p.id, q + 1)}>+</button>
                    </div>
                  </td>
                  <td className="qorder__cell-sub">{q * ht}€</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="qorder__footer">
        <div className="qorder__tier">
          {tierInfo.tier ? (
            <span className="qorder__tier-ok">✓ Vous bénéficiez du palier <strong>{tierInfo.label}</strong></span>
          ) : futsManquants !== null && totalFuts > 0 ? (
            <span className="qorder__tier-progress">
              Plus que <strong>{futsManquants} fût{futsManquants > 1 ? 's' : ''}</strong> pour débloquer <strong>-10%</strong>
            </span>
          ) : (
            <span className="qorder__tier-progress">Atteignez 6 fûts pour débloquer -10% · 16 fûts pour -20%</span>
          )}
        </div>

        <div className="qorder__totals">
          <div className="qorder__total-row">
            <span>Total HT</span>
            <span className="qorder__total-amount">{totalHT}€</span>
          </div>
          {tierInfo.discount > 0 && (
            <div className="qorder__total-row qorder__total-row--remise">
              <span>Avec remise {tierInfo.tier}</span>
              <span className="qorder__total-amount qorder__total-amount--gold">{totalAvecRemise}€</span>
            </div>
          )}
          <button
            className="btn btn-gold qorder__cta"
            onClick={addAll}
            disabled={totalFuts === 0}
          >
            Ajouter tout au panier {totalFuts > 0 && `(${totalFuts} fûts)`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickOrder
