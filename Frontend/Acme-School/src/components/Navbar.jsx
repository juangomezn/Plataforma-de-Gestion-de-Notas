import './Navbar.css'
import logo from '../assets/Logo3.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <img src={logo} alt="Acme School Logo" className="logo" />
                <span className="navbar-title">ACME SCHOOL</span>
            </div>

            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <Link to="/">Inicio</Link>
                <Link to="/profile">Perfil</Link>
                <Link to="/logout">Salir</Link>
            </div>
        </nav>
    )
}

export default Navbar