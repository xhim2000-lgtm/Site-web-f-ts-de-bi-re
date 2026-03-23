import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      {/* Background photo + overlays */}
      <div className="hero__bg">
        <img
          className="hero__bg-img"
          src="https://images.unsplash.com/photo-1559526324-593bc073d938?w=1920&q=80&auto=format&fit=crop"
          alt=""
          loading="eager"
        />
        <div className="hero__overlay" />
        <div className="hero__grain" />
        <div className="hero__gradient" />
        {/* Geometric decorative elements */}
        <svg className="hero__deco hero__deco--1" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#C9A84C" strokeWidth="0.5" opacity="0.15" />
          <circle cx="100" cy="100" r="60" stroke="#C9A84C" strokeWidth="0.3" opacity="0.1" />
        </svg>
        <svg className="hero__deco hero__deco--2" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" stroke="#C9A84C" strokeWidth="0.5" opacity="0.12" transform="rotate(45 50 50)" />
        </svg>
      </div>

      <div className="hero__content container">
        <div className="hero__badge fade-in">
          <span className="hero__badge-flag">&#127467;&#127479;</span>
          <span>+200 références artisanales</span>
        </div>

        <h1 className="hero__title fade-in">
          La bière pression<br />artisanale, <em>libérée.</em>
        </h1>

        <p className="hero__subtitle fade-in">
          FutLocal connecte les meilleures brasseries françaises aux professionnels
          et aux événements qui refusent les compromis.
        </p>

        <div className="hero__ctas fade-in">
          <a href="#selection" className="btn btn-gold">
            Découvrir la sélection
          </a>
          <a href="#pros" className="btn btn-outline">
            Espace Pro
          </a>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

export default Hero
