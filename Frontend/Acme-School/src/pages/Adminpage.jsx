import React from 'react'
import './AdminPage.css'
import Navbar from '../components/Navbar'

const AdminPage = () => {
    return (
        <div className="admin-page-container">
            <Navbar />

            <div className="admin-content">
                <div className="admin-header">
                    <h2>Bienvenido Administrador</h2>
                    <p>👋 Hola {user?.firstName} {user?.lastName}</p>
                    <p>Aqui tu puedes Gestionar todas las secciones del sistema: Usuarios, Cursos, Inscripciones y más.</p>
                </div>

                <div className="admin-options">
                    <div className="admin-option-card">
                        <h3>Gestión de Usuarios</h3>
                        <p>Gestiona los usuarios del sistema (estudiantes, profesores, administradores).</p>
                        <button>Acceder</button>
                    </div>
                    <div className="admin-option-card">
                        <h3>Gestión de Cursos</h3>
                        <p>Gestiona los cursos disponibles y sus detalles.</p>
                        <button>Acceder</button>
                    </div>
                    <div className="admin-option-card">
                        <h3>Inscripciones</h3>
                        <p>Inscribe estudiantes a los cursos y gestiona su progreso.</p>
                        <button>Acceder</button>
                    </div>
                    <div className="admin-option-card">
                        <h3>Reportes</h3>
                        <p>Genera y consulta reportes de los cursos y estudiantes.</p>
                        <button>Acceder</button>
                    </div>
                </div>

                <div className="logout-container">
                    <button className="logout-button">Cerrar Sesión</button>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
