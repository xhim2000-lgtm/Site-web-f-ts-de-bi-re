import { useEffect } from 'react'
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
import EventCalculator from './components/EventCalculator'
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
