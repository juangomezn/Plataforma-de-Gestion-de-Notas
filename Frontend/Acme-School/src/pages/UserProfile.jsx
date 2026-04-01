import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../api/client'

const UserProfile = () => {
    const { user: authUser, loading: authLoading } = useAuth()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (authLoading) return

        const params = new URLSearchParams(window.location.search)
        const userIdParam = params.get('userId')
        const targetId = userIdParam || authUser?._id
        if (!targetId) {
            setError('No se pudo determinar el usuario')
            return
        }

        const fetchUser = async () => {
            try {
                const response = await apiFetch(`/users/${targetId}`)
                if (!response.ok) {
                    const err = await response.json().catch(() => ({}))
                    setError(err.error || err.message || 'Error al cargar el perfil')
                    return
                }
                const data = await response.json()
                setUser(data)
                localStorage.setItem('userId', targetId)
            } catch (e) {
                console.error('Error al cargar el perfil:', e)
                setError('Error de conexión')
            }
        }

        fetchUser()
    }, [authLoading, authUser])

    if (authLoading || (!user && !error)) {
        return <div className="loading">Cargando perfil...</div>
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className="loading">{error}</div>
            </div>
        )
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
