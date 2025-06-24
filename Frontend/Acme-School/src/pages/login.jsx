import './Login.css'
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Login:', { email, password })
    }

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google'
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Ingresar</button>
                </form>

                <div className="divider">o</div>

                <button className="google-btn" onClick={handleGoogleLogin}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google icon" />
                    Registrarse con Google
                </button>
            </div>
        </div>
    )
}

export default Login
