/* eslint-disable react-refresh/only-export-components */
// Provider + hook co-localisés volontairement (pattern Context idiomatique).
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ZONE_STORAGE_KEY, checkDeliveryZone } from '../data/zones'

const DeliveryZoneContext = createContext()

export function DeliveryZoneProvider({ children }) {
  const [cp, setCp] = useState(() => {
    try { return localStorage.getItem(ZONE_STORAGE_KEY) || '' } catch { return '' }
  })
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    try {
      if (cp) localStorage.setItem(ZONE_STORAGE_KEY, cp)
      else localStorage.removeItem(ZONE_STORAGE_KEY)
    } catch { /* ignore */ }
  }, [cp])

  const zone = cp ? checkDeliveryZone(cp) : null

  const saveZone = useCallback((newCp) => {
    setCp(newCp.trim())
  }, [])

  const openZoneModal = useCallback(() => setModalOpen(true), [])
  const closeZoneModal = useCallback(() => setModalOpen(false), [])

  return (
    <DeliveryZoneContext.Provider value={{ cp, zone, saveZone, modalOpen, openZoneModal, closeZoneModal }}>
      {children}
    </DeliveryZoneContext.Provider>
  )
}

export function useDeliveryZone() {
  return useContext(DeliveryZoneContext)
}
