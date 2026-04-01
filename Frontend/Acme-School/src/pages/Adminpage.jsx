import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Adminpage.css'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const AdminPage = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/', { replace: true })
    }

    return (
        <div className="admin-page-container">
            <Navbar />

            <div className="admin-content">
                <div className="admin-header">
                    <h2>Bienvenido Administrador</h2>
                    <p>👋 Hola {user?.firstName} {user?.lastName}</p>
                    <p>Aquí puedes gestionar las secciones del sistema: usuarios, cursos, inscripciones y más.</p>
                </div>

                <div className="admin-options">
                    <div className="admin-option-card">
                        <h3>Gestión de Usuarios</h3>
                        <p>Gestiona los usuarios del sistema (estudiantes, profesores, administradores).</p>
                        <Link to="/user-management"><button type="button">Acceder</button></Link>
                    </div>
                    <div className="admin-option-card">
                        <h3>Gestión de Cursos</h3>
                        <p>Gestiona los cursos disponibles y sus detalles.</p>
                        <button type="button" disabled>Próximamente</button>
                    </div>
                    <div className="admin-option-card">
                        <h3>Inscripciones</h3>
                        <p>Inscribe estudiantes a los cursos y gestiona su progreso.</p>
                        <button type="button" disabled>Próximamente</button>
                    </div>
                    <div className="admin-option-card">
                        <h3>Reportes</h3>
                        <p>Genera y consulta reportes de los cursos y estudiantes.</p>
                        <button type="button" disabled>Próximamente</button>
                    </div>
                </div>

                <div className="logout-container">
                    <button type="button" className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
