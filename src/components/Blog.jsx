import './Blog.css'

const articles = [
  {
    id: 1,
    tag: 'Découverte',
    title: 'Découverte Régionale : 5 bières de 5 terroirs français',
    excerpt: 'D\u2019Alsace en Provence, un tour de France en pression pour découvrir la richesse des brasseries locales.',
    link: '#',
  },
  {
    id: 2,
    tag: 'Tendance',
    title: 'No/Low Alcohol : Les meilleures alternatives artisanales',
    excerpt: 'Le sans-alcool artisanal n\u2019est plus un compromis. Sélection de nos références les plus surprenantes.',
    link: '#',
  },
  {
    id: 3,
    tag: 'Saisonnier',
    title: 'Édition Noël : Notre sélection hivernale aux épices',
    excerpt: 'Cannelle, girofle, agrumes confits — quand les brasseurs français réinventent les classiques de Noël.',
    link: '#',
  },
]

function Blog() {
  return (
    <section id="blog" className="blog section-padding">
      <div className="container">
        <div className="fade-in">
          <h2 className="section-title">Les Sélections du Moment</h2>
          <p className="section-subtitle">
            Inspirations, découvertes et coups de c\u0153ur de l\u2019équipe.
          </p>
        </div>

        <div className="blog__list">
          {articles.map((article) => (
            <a key={article.id} href={article.link} className="blog__card fade-in">
              <div className="blog__card-img">
                <div className="blog__card-img-inner">
                  <svg viewBox="0 0 160 120" fill="none">
                    <rect x="20" y="20" width="120" height="80" rx="4" stroke="#C9A84C" strokeWidth="0.8" opacity="0.2" />
                    <circle cx="50" cy="50" r="12" stroke="#C9A84C" strokeWidth="0.8" opacity="0.15" />
                    <path d="M20 80 L60 50 L90 70 L140 30" stroke="#C9A84C" strokeWidth="0.8" opacity="0.15" />
                  </svg>
                </div>
              </div>

              <div className="blog__card-content">
                <span className="blog__card-tag">{article.tag}</span>
                <h3 className="blog__card-title">{article.title}</h3>
                <p className="blog__card-excerpt">{article.excerpt}</p>
                <span className="blog__card-link">
                  Lire la sélection <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
