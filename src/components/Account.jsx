import { useEffect, useRef, useState } from 'react'
import { useAccount } from './AccountContext'
import { useToast } from './ToastContext'
import './Account.css'

export function LoginModal() {
  const { loginOpen, setLoginOpen, login } = useAccount()
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const overlayRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (loginOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [loginOpen])

  if (!loginOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
  }

  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) setLoginOpen(false)
  }

  return (
    <div ref={overlayRef} className="login-overlay" onClick={handleOverlay}>
      <div className="login-modal">
        <button className="login-modal__close" onClick={() => setLoginOpen(false)} aria-label="Fermer">&times;</button>
        <span className="login-modal__icon">👤</span>
        <h2 className="login-modal__title">Espace client</h2>
        <p className="login-modal__sub">Connectez-vous pour accéder à votre wallet consigne et à votre historique.</p>

        <form className="login-modal__form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="email"
            className="login-modal__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login-modal__input"
            placeholder="Mot de passe"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button type="submit" className="btn btn-gold login-modal__submit">Se connecter</button>
        </form>

        <div className="login-modal__sep"><span>ou</span></div>

        <button className="btn btn-outline-gold login-modal__demo" onClick={login}>
          Demo : voir un compte exemple
        </button>

        <p className="login-modal__legal">
          En vous connectant, vous acceptez nos CGU et notre politique de confidentialité.
        </p>
      </div>
    </div>
  )
}

// Gate : le contenu (et son état convertOpen) n'est monté que dashboard ouvert,
// donc l'état se réinitialise au démontage — pas de setState dans un effet.
export function AccountDashboard() {
  const { dashboardOpen } = useAccount()
  if (!dashboardOpen) return null
  return <AccountDashboardInner />
}

function AccountDashboardInner() {
  const { setDashboardOpen, account, walletSolde, setWalletSolde, logout } = useAccount()
  const { showToast } = useToast()
  const [convertOpen, setConvertOpen] = useState(false)
  const overlayRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) setDashboardOpen(false)
  }

  const handleConvert = (type) => {
    const montant = type === 'virement' ? walletSolde : account.walletBonus
    setWalletSolde(0)
    setConvertOpen(false)
    showToast(
      type === 'virement'
        ? `Virement de ${montant}€ programmé sous 48h`
        : `Crédit boutique de ${montant}€ ajouté à votre compte`,
    )
  }

  const progressPct = Math.round(((10 - account.impact.futsRestants) / 10) * 100)

  return (
    <div ref={overlayRef} className="dash-overlay" onClick={handleOverlay}>
      <aside className="dash">
        <header className="dash__header">
          <div className="dash__avatar">{account.prenom[0]}{account.nom[0]}</div>
          <div className="dash__user">
            <p className="dash__user-name">{account.prenom} {account.nom}</p>
            <p className="dash__user-sub">{account.statut} · Membre depuis {account.membreDepuis}</p>
          </div>
          <button className="dash__logout" onClick={logout}>Déconnexion</button>
          <button className="dash__close" onClick={() => setDashboardOpen(false)} aria-label="Fermer">&times;</button>
        </header>

        <div className="dash__body">
          {/* Wallet */}
          <section className="dash__wallet">
            <div className="dash__wallet-head">
              <h3 className="dash__section-title">Mon Wallet Consigne</h3>
              <span className="dash__wallet-badge">Crédité automatiquement</span>
            </div>
            <div className="dash__wallet-solde">
              <span className="dash__wallet-amount">{walletSolde}€</span>
              <span className="dash__wallet-label">disponibles</span>
            </div>

            <h4 className="dash__wallet-list-title">Fûts en cours</h4>
            <ul className="dash__wallet-list">
              {account.futsEnCours.map((f, i) => (
                <li key={i} className="dash__wallet-item">
                  <div className="dash__wallet-item-info">
                    <p className="dash__wallet-item-name">{f.nom}</p>
                    <p className="dash__wallet-item-date">Livré le {f.livreLe}</p>
                  </div>
                  <span className={`dash__badge dash__badge--${f.tone}`}>{f.statut}</span>
                </li>
              ))}
            </ul>

            <button
              className="btn btn-gold dash__wallet-cta"
              onClick={() => setConvertOpen(true)}
              disabled={walletSolde === 0}
            >
              {walletSolde === 0 ? 'Cagnotte déjà récupérée' : 'Récupérer ma cagnotte'}
            </button>
          </section>

          {/* Impact */}
          <section className="dash__card">
            <h3 className="dash__section-title">Mon impact écolo</h3>
            <div className="dash__impact">
              <div className="dash__impact-stat">
                <span className="dash__impact-num">{account.impact.bouteilles}</span>
                <span className="dash__impact-lbl">bouteilles économisées 🍾</span>
              </div>
              <div className="dash__impact-stat">
                <span className="dash__impact-num">{account.impact.co2}</span>
                <span className="dash__impact-lbl">CO₂ évités vs jetable</span>
              </div>
            </div>
            <p className="dash__impact-next">
              Plus que <strong>{account.impact.futsRestants} fûts</strong> pour le statut <strong>« {account.impact.statutFutur} »</strong>
            </p>
            <div className="dash__progress">
              <div className="dash__progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </section>

          {/* Commandes */}
          <section className="dash__card">
            <h3 className="dash__section-title">Mes commandes</h3>
            <div className="dash__orders">
              {account.commandes.map((c, i) => (
                <div key={i} className="dash__order">
                  <div className="dash__order-info">
                    <span className="dash__order-date">{c.date}</span>
                    <span className="dash__order-products">{c.produits}</span>
                  </div>
                  <span className="dash__order-amount">{c.montant}€</span>
                  <span className="dash__badge dash__badge--done">{c.statut}</span>
                  <button
                    className="dash__order-reorder"
                    onClick={() => showToast('Commande répétée — vérifiez le panier')}
                  >Recommander en 1 clic</button>
                </div>
              ))}
            </div>
          </section>

          {/* Adresses */}
          <section className="dash__card">
            <h3 className="dash__section-title">Mes adresses & préférences</h3>
            <div className="dash__addr">
              <p className="dash__addr-label">Adresse principale</p>
              <p className="dash__addr-text">{account.adresse.rue}<br />{account.adresse.cp} {account.adresse.ville}</p>
              <p className="dash__addr-label dash__addr-label--top">Créneaux préférés</p>
              <p className="dash__addr-text">{account.creneaux}</p>
              <p className="dash__addr-label dash__addr-label--top">Newsletters</p>
              <ul className="dash__newsletters">
                <li>{account.newsletters.selections ? '✓' : '✗'} Sélections du mois</li>
                <li>{account.newsletters.promos ? '✓' : '✗'} Promotions</li>
              </ul>
            </div>
          </section>
        </div>
      </aside>

      {convertOpen && (
        <div className="dash-convert" onClick={(e) => { if (e.currentTarget === e.target) setConvertOpen(false) }}>
          <div className="dash-convert__modal">
            <button className="dash-convert__close" onClick={() => setConvertOpen(false)} aria-label="Fermer">&times;</button>
            <h3 className="dash-convert__title">Comment récupérer vos {walletSolde}€ ?</h3>

            <div className="dash-convert__options">
              <button className="dash-convert__option" onClick={() => handleConvert('virement')}>
                <span className="dash-convert__option-icon">💳</span>
                <div>
                  <p className="dash-convert__option-name">Virement bancaire</p>
                  <p className="dash-convert__option-amount">{walletSolde}€</p>
                  <p className="dash-convert__option-sub">Reçu sous 48h sur votre IBAN.</p>
                </div>
              </button>
              <button className="dash-convert__option dash-convert__option--bonus" onClick={() => handleConvert('credit')}>
                <span className="dash-convert__badge">+15% BONUS</span>
                <span className="dash-convert__option-icon">🎁</span>
                <div>
                  <p className="dash-convert__option-name">Crédit boutique</p>
                  <p className="dash-convert__option-amount">{account.walletBonus}€</p>
                  <p className="dash-convert__option-sub">Utilisable dès la prochaine commande.</p>
                </div>
              </button>
            </div>

            <p className="dash-convert__legal">Conversion soumise aux conditions générales.</p>
          </div>
        </div>
      )}
    </div>
  )
}
