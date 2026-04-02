import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const refreshSession = useCallback(async () => {
        try {
            const res = await apiFetch('/auth/me')
            if (res.status === 401) {
                setUser(null)
                return null
            }
            const data = await res.json()
            if (data.authenticated && data.user) {
                setUser(data.user)
                if (data.user._id) {
                    localStorage.setItem('userId', data.user._id)
                }
                return data.user
            }
            setUser(null)
            return null
        } catch {
            setUser(null)
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        refreshSession()
    }, [refreshSession])

    const clearLocalSession = useCallback(() => {
        setUser(null)
        localStorage.removeItem('userId')
        localStorage.removeItem('user')
    }, [])

    const logout = useCallback(async () => {
        try {
            await apiFetch('/auth/logout', { method: 'POST', skipAuthHandling: true })
        } finally {
            clearLocalSession()
        }
    }, [clearLocalSession])

    const value = useMemo(
        () => ({
            user,
            loading,
            roleType: user?.roleType ?? null,
            refreshSession,
            logout,
            clearLocalSession,
        }),
        [user, loading, refreshSession, logout, clearLocalSession]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error('useAuth debe usarse dentro de AuthProvider')
    }
    return ctx
}
