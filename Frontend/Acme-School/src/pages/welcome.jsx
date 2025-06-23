import React from 'react'
import './Welcome.css'
import Navbar from '../components/Navbar'

const Welcome = () => {
    return (
        <div>
            <Navbar />
            <div className="welcome-container">
                <div className="welcome-content">
                    <h1>Bienvenido a ACME SCHOOL</h1>
                    <p>
                        Plataforma integral de gestión académica diseñada para modernizar la administración escolar.
                        Aquí estudiantes, docentes y administradores pueden gestionar notas, horarios, asistencia
                        y más, de forma rápida y eficiente.
                    </p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>📚 Gestión Académica</h3>
                            <p>Registra, consulta y edita calificaciones de forma rápida.</p>
                        </div>
                        <div className="feature-card">
                            <h3>👨‍🏫 Panel Docente</h3>
                            <p>Herramientas para profesores: clases, asistencia y reportes.</p>
                        </div>
                        <div className="feature-card">
                            <h3>🎓 Portal Estudiantil</h3>
                            <p>Consulta tus notas, horarios y mensajes desde un solo lugar.</p>
                        </div>
                        <div className="feature-card">
                            <h3>🔒 Seguridad</h3>
                            <p>Acceso seguro con autenticación y control de roles.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
