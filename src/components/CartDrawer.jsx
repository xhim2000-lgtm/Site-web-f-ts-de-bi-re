import { useState, useEffect, useRef } from 'react'
import { useCart } from './CartContext'
import Checkout from './Checkout'
import './CartDrawer.css'

function CartDrawer() {
  const { items, subtotal, updateQty, removeItem, drawerOpen, setDrawerOpen } = useCart()
  const overlayRef = useRef(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) setDrawerOpen(false)
  }

  return (
    <div
      ref={overlayRef}
      className={`cart-overlay ${drawerOpen ? 'cart-overlay--open' : ''}`}
      onClick={handleOverlayClick}
    >
      <aside className={`cart-drawer ${drawerOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Votre panier</h2>
          <button className="cart-drawer__close" onClick={() => setDrawerOpen(false)} aria-label="Fermer">
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Votre panier est vide.</p>
            <button className="btn btn-outline cart-drawer__browse" onClick={() => setDrawerOpen(false)}>
              Voir la sélection
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={item.id} className="cart-drawer__item">
                  <div className="cart-drawer__item-info">
                    <span className="cart-drawer__item-name">{item.name}</span>
                    <span className="cart-drawer__item-vol">{item.volume} &middot; {item.price}€</span>
                  </div>
                  <div className="cart-drawer__item-actions">
                    <button className="cart-drawer__qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="cart-drawer__qty">{item.qty}</span>
                    <button className="cart-drawer__qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    <button className="cart-drawer__remove" onClick={() => removeItem(item.id)} aria-label="Supprimer">
                      &#128465;
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__subtotal">
                <span>Sous-total</span>
                <span className="cart-drawer__subtotal-price">{subtotal}€</span>
              </div>
              <button className="btn btn-gold cart-drawer__checkout" onClick={() => { setDrawerOpen(false); setCheckoutOpen(true) }}>
                Valider la commande
              </button>
            </div>
          </>
        )}
      </aside>
      <Checkout open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  )
}

export default CartDrawer
