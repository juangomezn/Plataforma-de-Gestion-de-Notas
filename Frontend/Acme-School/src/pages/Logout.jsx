import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Logout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        logout().then(() => navigate('/', { replace: true }))
    }, [logout, navigate])

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            Cerrando sesión…
        </div>
    )
}

export default Logout
