import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="footer__logo">
              <span className="footer__logo-f">F</span>utLocal
            </a>
            <p className="footer__tagline">La bière pression artisanale, libérée.</p>
          </div>

          <div className="footer__links">
            <a href="#">CGV</a>
            <a href="#">Mentions légales</a>
            <a href="#">RGPD</a>
            <a href="#">Recrutement</a>
          </div>

          <div className="footer__social">
            {/* Instagram */}
            <a href="#" className="footer__social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="footer__social-link" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M8 11v5M8 8v.01M12 16v-5c0-1.5 1-2 2-2s2 .5 2 2v5" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2025 FutLocal &mdash; Distribué en France, Belgique, Luxembourg &amp; Suisse</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
