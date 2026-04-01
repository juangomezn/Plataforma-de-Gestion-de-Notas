import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './UserManagment.css';
import { apiFetch } from '../api/client';

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
            rol: typeof user.rol === 'object' ? user.rol._id : user.rol
        });
    };

    const handleUpdate = async () => {
    try {
        const rolMap = {
            admin: "685741f6742f783de332f842",
            teacher: "68589a9fc21e9559fadca98b",
            student: "68589aa8c21e9559fadca98d"
        };

        const formData = {
            ...editFormData,
            rol: rolMap[editFormData.rol] || editFormData.rol
        };

        console.log('ROL A ENVIAR:', formData.rol);

        const response = await apiFetch(`/users/${editingUser._id}`, {
            method: 'PUT',
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('Error actualizando usuario:', result.message || result);
            return;
        }

        const updatedUser = result.user || result;
        setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
        setEditingUser(null);
    } catch (error) {
        console.error('Error en fetch:', error.message);
    }
};



    return (
        <div className="user-management-container">
            <Navbar />
            <div className="user-management-content">
                <h1>Gestión de Usuarios</h1>
                <p>Aquí puedes ver, editar y eliminar usuarios.</p>


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
                                    <td>{typeof user.rol === 'object' ? user.rol._id : user.rol}</td>
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
                            <option value="685741f6742f783de332f842">admin</option>
                            <option value="68589a9fc21e9559fadca98b">teacher</option>
                            <option value="68589aa8c21e9559fadca98d">student</option>
                        </select>

                        <button onClick={handleUpdate}>Guardar cambios</button>
                        <button onClick={() => setEditingUser(null)}>Cancelar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagementPage;
