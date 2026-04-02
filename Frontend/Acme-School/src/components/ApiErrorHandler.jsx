import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const PUBLIC_PATHS = new Set(['/', '/login'])

export function ApiErrorHandler() {
    const navigate = useNavigate()
    const location = useLocation()
    const { clearLocalSession } = useAuth()
    const { showToast } = useToast()
    const handling = useRef(false)

    useEffect(() => {
        const onUnauthorized = () => {
            if (handling.current) return
            if (PUBLIC_PATHS.has(location.pathname)) return
            handling.current = true
            clearLocalSession()
            showToast('Sesión expirada o no válida. Inicia sesión de nuevo.', { type: 'info', duration: 5000 })
            navigate('/login', { replace: true })
            queueMicrotask(() => {
                handling.current = false
            })
        }

        const onForbidden = () => {
            if (location.pathname === '/unauthorized') return
            showToast('No tienes permiso para esta acción.', { type: 'error' })
            navigate('/unauthorized', { replace: true })
        }

        window.addEventListener('api:unauthorized', onUnauthorized)
        window.addEventListener('api:forbidden', onForbidden)
        return () => {
            window.removeEventListener('api:unauthorized', onUnauthorized)
            window.removeEventListener('api:forbidden', onForbidden)
        }
    }, [navigate, location.pathname, clearLocalSession, showToast])

    return null
}
