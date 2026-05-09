import './Login.css'
import React, { useState } from 'react'
import logo from '../assets/Logo-Google.png'
import logoAcme from '../assets/logo-colores-texto.png'

const Login = () => {

    const handleGoogleLogin = () => {
        window.location.href = '/api/auth/google'
    }

    return (
        <div className="login-container">
            <img src={logoAcme} className='logo-login'/>
            <div className="login-form">
                <h2>Iniciar sesión</h2>

                <button className="google-btn" onClick={handleGoogleLogin}>
                    <img src={logo} alt="Google icon" />
                    Ingresa con Google
                </button> 
            </div>
        </div>
    )
}

export default Login