import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CompleteProfile.css'
import Navbar from '../components/Navbar'
import { apiFetch } from '../api/client'
import { useAuth } from '../context/AuthContext'

const ROLES = {
    admin: '685741f6742f783de332f842',
    teacher: '68589a9fc21e9559fadca98b',
    student: '68589aa8c21e9559fadca98d'
}

const CompleteProfile = () => {
    const navigate = useNavigate()
    const { refreshSession } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        rol: '',
        firstName: '',
        lastName: '',
        identificationType: '',
        identificationNumber: '',
        gender: '',
        birthdate: '',
        addressStreet: '',
        addressNumber: '',
        cityCode: '',
        cityName: ''
    })

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const userId = params.get('userId')

        if (userId) {
            localStorage.setItem('userId', userId)
            console.log('✅ userId guardado:', userId)

            apiFetch(`/users/${userId}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.email) {
                        setFormData(prev => ({ ...prev, email: data.email }))
                    }
                })
                .catch(err => console.error('❌ Error obteniendo email:', err))
        }
    }, [])

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
    e.preventDefault()

    const userData = {
        email: formData.email,
        rol: formData.rol,
        firstName: formData.firstName,
        lastName: formData.lastName,
        identification: {
            type: formData.identificationType,
            number: formData.identificationNumber
        },
        gender: formData.gender,
        birthdate: formData.birthdate,
        address: {
            street: formData.addressStreet,
            number: formData.addressNumber
        },
        city: {
            code: formData.cityCode,
            name: formData.cityName
        }
    }

    try {
        const response = await apiFetch(`/users/complete-profile`, {
            method: 'POST',
            body: JSON.stringify(userData)
        })

        const result = await response.json()
        if (response.ok) {
            alert('✅ Usuario registrado correctamente')
            localStorage.setItem('user', JSON.stringify(result.user))
            await refreshSession()
            navigate('/user-profile', { replace: true })
        } else {
            alert('❌ Error: ' + result.details)
        }
    } catch (error) {
        console.error('Error de conexión:', error)
        alert('Error al conectar con el servidor')
    }
}


    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="form-wrapper">
                    <h2>Completa tu perfil</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label>Rol:</label>
                            <select name="rol" value={formData.rol} onChange={handleChange} required>
                                <option value="">Selecciona...</option>
                                <option value={ROLES.admin}>Administrador</option>
                                <option value={ROLES.teacher}>Profesor</option>
                                <option value={ROLES.student}>Estudiante</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Nombre:</label>
                            <input type="text" name="firstName" placeholder='Ingresa tu Nombre' value={formData.firstName} onChange={handleChange} required />
                        </div>

                        <div className="form-row">
                            <label>Apellido:</label>
                            <input type="text" name="lastName" placeholder='Ingresa tu Apellido' value={formData.lastName} onChange={handleChange} required />
                        </div>

                        <div className="form-row">
                            <label>Tipo de Identificación:</label>
                            <select name="identificationType" value={formData.identificationType} onChange={handleChange} required>
                                <option value="">Selecciona...</option>
                                <option value="CC">Cédula de Ciudadanía</option>
                                <option value="TI">Tarjeta de Identidad</option>
                                <option value="CE">Cédula de Extranjería</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Número de Identificación:</label>
                            <input type="text" name="identificationNumber" placeholder='Número de Identificación' value={formData.identificationNumber} onChange={handleChange} required />
                        </div>

                        <div className="form-row">
                            <label>Género:</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Selecciona...</option>
                                <option value="Male">Masculino</option>
                                <option value="Female">Femenino</option>
                                <option value="Other">Otro</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Fecha de nacimiento:</label>
                            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
                        </div>

                        <h3>Dirección</h3>

                        <div className="form-row">
                            <label>Calle:</label>
                            <input type="text" name="addressStreet" placeholder='Calle' value={formData.addressStreet} onChange={handleChange} required />
                        </div>

                        <div className="form-row">
                            <label>Número:</label>
                            <input type="text" name="addressNumber" placeholder='Número' value={formData.addressNumber} onChange={handleChange} required />
                        </div>

                        <h3>Ciudad</h3>

                        <div className="form-row">
                            <label>Codigo de Ciudad:</label>
                            <input type="text" name="cityCode" placeholder='Ingresa el Codigo de Ciudad' value={formData.cityCode} onChange={handleChange} required />
                        </div>

                        <div className="form-row">
                            <label>Ciudad:</label>
                            <input type="text" name="cityName" placeholder='Ingresa la Ciudad' value={formData.cityName} onChange={handleChange} required />
                        </div>

                        <button type="submit" className="submit-button">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompleteProfile
