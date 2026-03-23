import { useState } from 'react'
import './Contact.css'

const shops = [
  {
    city: 'Paris',
    district: 'Le Marais',
    focus: 'Dégustation & stock immédiat',
    hours: '10h\u201319h, 7j/7',
  },
  {
    city: 'Lyon',
    district: 'Bellecour',
    focus: 'Focus B2B & démonstrations',
    hours: '10h\u201319h, 7j/7',
  },
  {
    city: 'Bordeaux',
    district: 'Chartrons',
    focus: 'Thématique terroir, événements locaux',
    hours: '10h\u201319h, 7j/7',
  },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: 'particulier', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <div className="contact__header fade-in">
          <h2 className="section-title">On est là où vous êtes.</h2>
        </div>

        <div className="contact__shops">
          {shops.map((shop) => (
            <div key={shop.city} className="contact__shop fade-in">
              <h3 className="contact__shop-city">{shop.city}</h3>
              <span className="contact__shop-district">{shop.district}</span>
              <p className="contact__shop-focus">{shop.focus}</p>
              <span className="contact__shop-hours">{shop.hours}</span>
            </div>
          ))}
        </div>

        <div className="contact__form-wrap fade-in">
          <h3 className="contact__form-title">Nous contacter</h3>
          <p className="contact__form-email">hello@futlocal.fr</p>

          {submitted ? (
            <div className="contact__success">
              <p>Merci pour votre message. Nous revenons vers vous sous 24h.</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="name">Nom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.fr"
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="particulier">Particulier</option>
                  <option value="professionnel">Professionnel</option>
                </select>
              </div>

              <div className="contact__field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Votre message..."
                />
              </div>

              <button type="submit" className="btn btn-gold btn--large">
                Envoyer
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
