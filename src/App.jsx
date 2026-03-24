import { useEffect } from 'react'
import { CartProvider } from './components/CartContext'
import CartDrawer from './components/CartDrawer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Catalogue from './components/Catalogue'
import ProSection from './components/ProSection'
import Histoire from './components/Histoire'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ConsigneWidget from './components/ConsigneWidget'
import './App.css'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main>
        <Hero />
        <Stats />
        <Catalogue />
        <ProSection />
        <Histoire />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ConsigneWidget />
    </CartProvider>
  )
}

export default App
