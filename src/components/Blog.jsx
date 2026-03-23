import './Blog.css'

const articles = [
  {
    id: 1,
    tag: 'Découverte',
    title: 'Découverte Régionale : 5 bières de 5 terroirs français',
    excerpt: 'D\u2019Alsace en Provence, un tour de France en pression pour découvrir la richesse des brasseries locales.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=280&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'Tendance',
    title: 'No/Low Alcohol : Les meilleures alternatives artisanales',
    excerpt: 'Le sans-alcool artisanal n\u2019est plus un compromis. Sélection de nos références les plus surprenantes.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed514?w=400&h=280&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'Saisonnier',
    title: 'Édition Noël : Notre sélection hivernale aux épices',
    excerpt: 'Cannelle, girofle, agrumes confits — quand les brasseurs français réinventent les classiques de Noël.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=400&h=280&q=80&auto=format&fit=crop',
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
                <img
                  className="blog__card-photo"
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                />
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
