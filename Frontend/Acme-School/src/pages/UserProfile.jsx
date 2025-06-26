import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import Navbar from '../components/Navbar'

const UserProfile = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const userId = params.get('userId')

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`)
                const data = await response.json()
                setUser(data)
            } catch (error) {
                console.error('Error al cargar el perfil:', error)
            }
        }

        fetchUser()
    }, [])

    if (!user) {
        return <div className="loading">Cargando perfil...</div>
    }

    return (
        <div>
            <Navbar />
            <div className="full-profile">
                <aside className="profile-aside">
                    {user.photo ? (
                        <img src={user.photo} alt="Foto de perfil" />
                    ) : (
                        <div className="big-avatar">{user.firstName?.[0]}</div>
                    )}
                    <h2>{user.firstName} {user.lastName}</h2>
                    <span className={`role-badge ${user.rol}`}>{user.rol}</span>
                </aside>

                <section className="profile-details">
                    <h1>Información del Usuario</h1>
                    <div className="info-grid">
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Género:</strong> {user.gender}</div>
                        <div><strong>Identificación:</strong> {user.identification?.type} {user.identification?.number}</div>
                        <div><strong>Fecha Nacimiento:</strong> {user.birthdate?.slice(0, 10)}</div>
                        <div><strong>Dirección:</strong> Calle {user.address?.street} #{user.address?.number}</div>
                        <div><strong>Ciudad:</strong> {user.city?.name} ({user.city?.code})</div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default UserProfile
