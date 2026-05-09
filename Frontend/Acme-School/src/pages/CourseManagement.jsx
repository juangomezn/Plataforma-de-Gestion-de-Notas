import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { apiFetch } from '../api/client'
import { useToast } from '../context/ToastContext'
import './CourseManagement.css'

const emptyForm = {
    code: '',
    description: '',
    intensity: 1,
    weight: 1,
    active: true,
}

async function parseError(res) {
    try {
        const data = await res.json()
        return data.message || data.details || data.error || JSON.stringify(data)
    } catch {
        return res.statusText || 'Error'
    }
}

export default function CourseManagement() {
    const { showToast } = useToast()
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)

    const loadCourses = async () => {
        setLoading(true)
        try {
            const res = await apiFetch('/courses')
            if (!res.ok) {
                showToast(await parseError(res), { type: 'error' })
                return
            }
            const data = await res.json()
            setCourses(Array.isArray(data) ? data : [])
        } catch (e) {
            showToast('No se pudieron cargar los cursos', { type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCourses()
    }, [])

    const startCreate = () => {
        setEditingId(null)
        setForm(emptyForm)
    }

    const startEdit = (c) => {
        setEditingId(c._id)
        setForm({
            code: c.code ?? '',
            description: c.description ?? '',
            intensity: c.intensity ?? 1,
            weight: c.weight ?? 1,
            active: c.active !== false,
        })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setForm(emptyForm)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            code: form.code.trim(),
            description: form.description.trim(),
            intensity: Number(form.intensity),
            weight: Number(form.weight),
            active: Boolean(form.active),
            topics: [],
        }

        try {
            const url = editingId ? `/courses/${editingId}` : '/courses'
            const method = editingId ? 'PUT' : 'POST'
            const res = await apiFetch(url, {
                method,
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                showToast(await parseError(res), { type: 'error' })
                return
            }

            showToast(editingId ? 'Curso actualizado' : 'Curso creado', { type: 'success' })
            cancelEdit()
            await loadCourses()
        } catch {
            showToast('Error al guardar el curso', { type: 'error' })
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar este curso?')) return
        try {
            const res = await apiFetch(`/courses/${id}`, { method: 'DELETE' })
            if (!res.ok) {
                showToast(await parseError(res), { type: 'error' })
                return
            }
            showToast('Curso eliminado', { type: 'success' })
            if (editingId === id) cancelEdit()
            await loadCourses()
        } catch {
            showToast('Error al eliminar', { type: 'error' })
        }
    }

    return (
        <div className="course-mgmt">
            <Navbar />
            <div className="course-mgmt__inner">
                <div className="course-mgmt__header">
                    <h1>Gestión de cursos</h1>
                    <Link to="/admin-page" className="course-mgmt__back">
                        ← Volver al panel
                    </Link>
                </div>

                <form className="course-mgmt__form" onSubmit={handleSubmit}>
                    <h2>{editingId ? 'Editar curso' : 'Nuevo curso'}</h2>
                    <div className="course-mgmt__row">
                        <label>
                            Código
                            <input
                                value={form.code}
                                onChange={(e) => setForm({ ...form, code: e.target.value })}
                                required
                                maxLength={20}
                                disabled={Boolean(editingId)}
                            />
                        </label>
                        <label>
                            Intensidad horaria
                            <input
                                type="number"
                                min={1}
                                max={100}
                                value={form.intensity}
                                onChange={(e) => setForm({ ...form, intensity: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Peso (créditos)
                            <input
                                type="number"
                                min={0.1}
                                max={10}
                                step={0.1}
                                value={form.weight}
                                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                                required
                            />
                        </label>
                    </div>
                    <label className="course-mgmt__block">
                        Descripción
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                            maxLength={500}
                            rows={3}
                        />
                    </label>
                    <label className="course-mgmt__check">
                        <input
                            type="checkbox"
                            checked={form.active}
                            onChange={(e) => setForm({ ...form, active: e.target.checked })}
                        />
                        Activo
                    </label>
                    <div className="course-mgmt__actions">
                        <button type="submit">{editingId ? 'Guardar cambios' : 'Crear curso'}</button>
                        {editingId && (
                            <button type="button" className="secondary" onClick={cancelEdit}>
                                Cancelar edición
                            </button>
                        )}
                        {!editingId && (
                            <button type="button" className="secondary" onClick={startCreate}>
                                Limpiar formulario
                            </button>
                        )}
                    </div>
                </form>

                <section className="course-mgmt__list">
                    <h2>Cursos registrados</h2>
                    {loading ? (
                        <p>Cargando…</p>
                    ) : courses.length === 0 ? (
                        <p className="course-mgmt__empty">No hay cursos aún.</p>
                    ) : (
                        <div className="course-mgmt__table-wrap">
                            <table className="course-mgmt__table">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Descripción</th>
                                        <th>Intensidad</th>
                                        <th>Peso</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.code}</td>
                                            <td>{c.description}</td>
                                            <td>{c.intensity}</td>
                                            <td>{c.weight}</td>
                                            <td>{c.active === false ? 'Inactivo' : 'Activo'}</td>
                                            <td>
                                                <button type="button" onClick={() => startEdit(c)}>
                                                    Editar
                                                </button>
                                                <button type="button" className="danger" onClick={() => handleDelete(c._id)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
