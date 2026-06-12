import { useEffect, useState } from 'react'
import { CartProvider } from './components/CartContext'
import { ToastProvider } from './components/ToastContext'
import { DeliveryZoneProvider } from './components/DeliveryZoneContext'
import { AccountProvider } from './components/AccountContext'
import { DeliveryBanner, DeliveryZoneModal } from './components/DeliveryZone'
import { LoginModal, AccountDashboard } from './components/Account'
import CartDrawer from './components/CartDrawer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import PacksSection from './components/PacksSection'
import Catalogue from './components/Catalogue'
import CataloguePage from './components/CataloguePage'
import EventCalculator from './components/EventCalculator'
import ProSection from './components/ProSection'
import Histoire from './components/Histoire'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ConsigneWidget from './components/ConsigneWidget'
import './App.css'

function isCatalogueHash(hash) {
  return hash === '#catalogue' || hash.startsWith('#catalogue?')
}

function App() {
  const [catalogueOpen, setCatalogueOpen] = useState(() => isCatalogueHash(window.location.hash))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Routing hash : #catalogue ouvre la page catalogue plein écran
  useEffect(() => {
    const onHashChange = () => setCatalogueOpen(isCatalogueHash(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const closeCatalogue = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.hash = ''
    }
  }

  return (
    <ToastProvider>
      <AccountProvider>
        <DeliveryZoneProvider>
          <CartProvider>
            <Navbar />
            <DeliveryBanner />
            <DeliveryZoneModal />
            <LoginModal />
            <AccountDashboard />
            <CartDrawer />
            {catalogueOpen && <CataloguePage onClose={closeCatalogue} />}
            <main>
              <Hero />
              <Stats />
              <PacksSection />
              <Catalogue />
              <EventCalculator />
              <ProSection />
              <Histoire />
              <Blog />
              <Contact />
            </main>
            <Footer />
            <ConsigneWidget />
          </CartProvider>
        </DeliveryZoneProvider>
      </AccountProvider>
    </ToastProvider>
  )
}

export default App
