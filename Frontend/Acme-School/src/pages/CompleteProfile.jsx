import { useState } from 'react'
import './CompleteProfile.css'
import Navbar from '../components/Navbar'

const CompleteProfile = () => {
    const [formData, setFormData] = useState({
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

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCityChange = e => {
        const [code, name] = e.target.value.split('|')
        setFormData({ ...formData, cityCode: code, cityName: name })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('Datos enviados:', formData)
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
                            <select name="rol" value={formData.gender} onChange={handleChange} required>
                                <option value="">Selecciona...</option>
                                <option value="Male">Administrador</option>
                                <option value="Female">Profesor</option>
                                <option value="Other">Estudiante</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Nombre:</label>
                            <input type="text" name="firstName" placeholder='Ingresa tu Nombre' className='colorplaceholder' value={formData.firstName} onChange={handleChange} required />
                        </div>

                        <div className="form-row">
                            <label>Apellido:</label>
                            <input type="text" name="lastName" placeholder='Ingresa tu Apellido' value={formData.lastName} onChange={handleChange} required />
                        </div>

                        <div className="form-row">
                            <label>Tipo de Identificación:</label>
                            <select name="identificationType" value={formData.identificationType} onChange={handleChange} required>
                                <option value="">Selecciona...</option>
                                <option value="CC">Cédula de Ciudadania</option>
                                <option value="TI">Tarjeta de Identidad</option>
                                <option value="CE">Cédula de Extranjería</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Número de Identificación:</label>
                            <input type="text" name="identificationNumber" placeholder='Ingresa tu Numero de Identificación' value={formData.identificationNumber} onChange={handleChange} required />
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

                        <h3>Direccion</h3>

                        <div className="form-row">
                            <label>Calle:</label>
                            <input type="text" name="addressStreet" placeholder='Ingresa la calle de tu direccion' value={formData.addressStreet} onChange={handleChange} required />
                        </div>

                        <div className="form-row">
                            <label>Numero:</label>
                            <input type="text" name="addressNumber" placeholder='Ingresa la numero de tu direccion' value={formData.addressStreet} onChange={handleChange} required />
                        </div>

                        <h3>Ciudad</h3>

                        <div className="form-row">
                            <label>Ciudad:</label>
                            <select name="city" onChange={handleCityChange} required>
                                <option value="">Selecciona una ciudad...</option>
                                <option value="APA01|Apartadó">Apartadó - APA01</option>
                                <option value="ARM01|Armenia">Armenia - ARM01</option>
                                <option value="BAR01|Barranquilla">Barranquilla - BAR01</option>
                                <option value="BOG01|Bogotá">Bogotá - BOG01</option>
                                <option value="BGA01|Bucaramanga">Bucaramanga - BGA01</option>
                                <option value="CAL01|Cali">Cali - CAL01</option>
                                <option value="CAR01|Cartagena">Cartagena - CAR01</option>
                                <option value="CUC01|Cúcuta">Cúcuta - CUC01</option>
                                <option value="FLR01|Florencia">Florencia - FLR01</option>
                                <option value="IBE01|Ibagué">Ibagué - IBE01</option>
                                <option value="INR01|Inírida">Inírida - INR01</option>
                                <option value="LET01|Leticia">Leticia - LET01</option>
                                <option value="MAN01|Manizales">Manizales - MAN01</option>
                                <option value="MED01|Medellín">Medellín - MED01</option>
                                <option value="MIT01|Mitú">Mitú - MIT01</option>
                                <option value="MOX01|Mocoa">Mocoa - MOX01</option>
                                <option value="MON01|Montería">Montería - MON01</option>
                                <option value="NVA01|Neiva">Neiva - NVA01</option>
                                <option value="POP01|Popayán">Popayán - POP01</option>
                                <option value="PST01|Pasto">Pasto - PST01</option>
                                <option value="PTO01|Puerto Carreño">Puerto Carreño - PTO01</option>
                                <option value="QUI01|Quibdó">Quibdó - QUI01</option>
                                <option value="RIO01|Riohacha">Riohacha - RIO01</option>
                                <option value="SMA01|Santa Marta">Santa Marta - SMA01</option>
                                <option value="SNT01|San Andrés">San Andrés - SNT01</option>
                                <option value="SJN01|San José del Guaviare">San José del Guaviare - SJN01</option>
                                <option value="TAR01|Táriba">Táriba - TAR01</option>
                                <option value="TUN01|Tunja">Tunja - TUN01</option>
                                <option value="VAL01|Valledupar">Valledupar - VAL01</option>
                                <option value="VLL01|Villavicencio">Villavicencio - VLL01</option>
                                <option value="YOP01|Yopal">Yopal - YOP01</option>
                            </select>
                        </div>
                        <button type="submit" className="submit-button">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompleteProfile
