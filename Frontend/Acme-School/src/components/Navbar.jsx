import './Navbar.css'
import logo from '../assets/logo-colores.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { user, roleType, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/', { replace: true })
    }

    const getHomeRoute = () => {
        if (!user) return '/'
        if (roleType === 'admin') return '/admin-page'
        if (roleType === 'teacher') return '/teacher-dashboard'
        if (roleType === 'student') return '/student-dashboard'
        return '/'
    }

    return (
        <nav className="navbar">

            {/* IZQUIERDA */}
            <div className="navbar-left">
                <img src={logo} alt="logo" className="logo" />
                <span className="navbar-title">ACME SCHOOL</span>
            </div>

            {/* HAMBURGUESA */}
            <button
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            {/* DERECHA */}
            <div className={`navbar-right ${menuOpen ? 'active' : ''}`}>

                <div className="nav-links">

                    <Link to={getHomeRoute()} onClick={() => setMenuOpen(false)}>
                        Inicio
                    </Link>

                    {user && (
                        <Link to="/user-profile" onClick={() => setMenuOpen(false)}>
                            Perfil
                        </Link>
                    )}

                </div>

                {user && (
                    <div className="nav-user">

                    <div className="user-info">
                        <span className="user-name">
                            {user.firstName}
                        </span>
                
                        <span className={`role-badge ${roleType}`}>
                            {roleType}
                        </span>
                    </div>
                
                    <button onClick={() => { setMenuOpen(false); handleLogout() }}>
                        Salir
                    </button>
                
                </div>
                )}

                {!user && (
                    <Link to="/login" className="login-btn">
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar