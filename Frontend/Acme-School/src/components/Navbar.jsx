import './Navbar.css'
import logo from '../assets/Logo3.png'
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

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <img src={logo} alt="Acme School Logo" className="logo" />
                <span className="navbar-title">ACME SCHOOL</span>
            </div>

            <button type="button" className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
                {user && (
                    <>
                        <Link to="/user-profile" onClick={() => setMenuOpen(false)}>Perfil</Link>
                        {roleType === 'admin' && (
                            <>
                                <Link to="/admin-page" onClick={() => setMenuOpen(false)}>Panel admin</Link>
                                <Link to="/user-management" onClick={() => setMenuOpen(false)}>Usuarios</Link>
                            </>
                        )}
                        {roleType === 'teacher' && (
                            <span className="nav-hint">Área docente (próximamente)</span>
                        )}
                        {roleType === 'student' && (
                            <span className="nav-hint">Mis cursos (próximamente)</span>
                        )}
                        <button type="button" className="nav-logout" onClick={() => { setMenuOpen(false); handleLogout() }}>
                            Salir
                        </button>
                    </>
                )}
                {!user && (
                    <Link to="/login" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
