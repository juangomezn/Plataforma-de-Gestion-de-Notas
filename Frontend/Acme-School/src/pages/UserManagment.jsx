import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './UserManagment.css';
import { apiFetch } from '../api/client';

const ROLE_LABELS = { admin: 'Administrador', teacher: 'Profesor', student: 'Estudiante' }
const ROLE_IDS = {
    admin: '685741f6742f783de332f842',
    teacher: '68589a9fc21e9559fadca98b',
    student: '68589aa8c21e9559fadca98d',
}

function formatRole(rol) {
    if (rol == null || rol === '') return 'Sin rol'
    if (typeof rol === 'object' && rol?._id != null) return ROLE_LABELS[rol.type] || rol.type
    return ROLE_LABELS[rol] || rol
}

function roleTypeToSelectValue(rol) {
    if (rol == null || rol === '') return ''
    if (typeof rol === 'object' && rol?._id) return rol._id
    if (typeof rol === 'string' && ROLE_IDS[rol]) return ROLE_IDS[rol]
    return typeof rol === 'string' ? rol : ''
}

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        rol: ''
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await apiFetch('/users');
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const response = await apiFetch(`/users/${userId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setUsers(users.filter(user => user._id !== userId));
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setEditFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rol: roleTypeToSelectValue(user.rol),
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await apiFetch(`/users/${editingUser._id}`, {
                method: 'PUT',
                body: JSON.stringify(editFormData)
            });

            const result = await response.json();

            if (!response.ok) return;

            const updatedUser = result.user || result;
            setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
            setEditingUser(null);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="user-management-container">
            <Navbar />

            <div className="user-management-content">
                <h1>Gestión de Usuarios</h1>
                <p>Administra los usuarios del sistema.</p>

                <div className="user-management-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>

                                    <td>
                                        <span className={`role-badge ${user.rol?.type || user.rol}`}>
                                            {formatRole(user.rol)}
                                        </span>
                                    </td>

                                    <td>
                                        <button onClick={() => handleEdit(user)}>Editar</button>
                                        <button onClick={() => handleDelete(user._id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {editingUser && (
                    <div className="edit-user-form">
                        <h3>Editar Usuario</h3>

                        <input
                            type="text"
                            value={editFormData.firstName}
                            onChange={e => setEditFormData({ ...editFormData, firstName: e.target.value })}
                            placeholder="Nombre"
                        />

                        <input
                            type="text"
                            value={editFormData.lastName}
                            onChange={e => setEditFormData({ ...editFormData, lastName: e.target.value })}
                            placeholder="Apellido"
                        />

                        <input
                            type="email"
                            value={editFormData.email}
                            onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                            placeholder="Correo"
                        />

                        <select
                            value={editFormData.rol}
                            onChange={e => setEditFormData({ ...editFormData, rol: e.target.value })}
                        >
                            <option value={ROLE_IDS.admin}>Administrador</option>
                            <option value={ROLE_IDS.teacher}>Profesor</option>
                            <option value={ROLE_IDS.student}>Estudiante</option>
                        </select>

                        <div>
                            <button onClick={handleUpdate}>Guardar</button>
                            <button onClick={() => setEditingUser(null)}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagementPage;