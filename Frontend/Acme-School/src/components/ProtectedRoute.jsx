import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando sesión…</div>
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}

export function RoleRoute({ roles, children }) {
    const { user, loading, roleType } = useAuth()

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando sesión…</div>
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    if (!roleType || !roles.includes(roleType)) {
        return <Navigate to="/unauthorized" replace />
    }
    return children
}
