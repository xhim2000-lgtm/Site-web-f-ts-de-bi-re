import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ACCOUNT_STORAGE_KEY, demoAccount } from '../data/account'

const AccountContext = createContext()

export function AccountProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(() => {
    try { return localStorage.getItem(ACCOUNT_STORAGE_KEY) === '1' } catch { return false }
  })
  const [loginOpen, setLoginOpen] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [walletSolde, setWalletSolde] = useState(demoAccount.walletSolde)

  useEffect(() => {
    try { localStorage.setItem(ACCOUNT_STORAGE_KEY, loggedIn ? '1' : '0') } catch (e) { /* ignore */ }
  }, [loggedIn])

  const openLogin = useCallback(() => {
    if (loggedIn) setDashboardOpen(true)
    else setLoginOpen(true)
  }, [loggedIn])

  const login = useCallback(() => {
    setLoggedIn(true)
    setLoginOpen(false)
    setDashboardOpen(true)
  }, [])

  const logout = useCallback(() => {
    setLoggedIn(false)
    setDashboardOpen(false)
  }, [])

  return (
    <AccountContext.Provider value={{
      loggedIn, walletSolde, setWalletSolde,
      loginOpen, setLoginOpen, openLogin, login, logout,
      dashboardOpen, setDashboardOpen,
      account: demoAccount,
    }}>
      {children}
    </AccountContext.Provider>
  )
}

export function useAccount() {
  return useContext(AccountContext)
}
