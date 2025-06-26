import React from 'react'
import './Welcome.css'
import logo from '../assets/Logo.png'

    const handleLogin = () => {
        window.location.href = 'http://localhost:5173/login'
    }

const Welcome = () => {
    return (
        <div className='general-container'>
            <div className='logo-container'>
                <img src={logo} alt="Acme School Logo" className="logo-header" />
            </div>
            <div className="welcome-container">
                <div className="welcome-content">
                    <h1>Bienvenido a ACME SCHOOL</h1>
                    <p>
                        Plataforma integral de gestión académica diseñada para modernizar la administración escolar.
                        Aquí estudiantes, docentes y administradores pueden gestionar notas, horarios, asistencia
                        y más, de forma rápida y eficiente.
                    </p>
                
                <button className="login-btn" onClick={handleLogin}>
                    Iniciar Sesion
                </button>
                </div>
            </div>
        </div>
    )
}

export default Welcome
