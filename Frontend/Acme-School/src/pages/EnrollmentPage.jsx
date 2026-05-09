import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { apiFetch } from '../api/client'
import './EnrollmentPage.css'

const EnrollmentPage = () => {
    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])
    const [enrollments, setEnrollments] = useState([])

    const [message, setMessage] = useState('')
    const [search, setSearch] = useState('')
    const [filterCourse, setFilterCourse] = useState('')

    const [form, setForm] = useState({
        student: '',
        course: ''
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
                apiFetch('/users'),
                apiFetch('/courses'),
                apiFetch('/enrollments')
            ])

            const users = await usersRes.json().catch(() => [])
            const courses = await coursesRes.json().catch(() => [])
            const enrollments = await enrollmentsRes.json().catch(() => [])

            setStudents(Array.isArray(users) ? users : [])
            setCourses(Array.isArray(courses) ? courses : [])
            setEnrollments(Array.isArray(enrollments) ? enrollments : [])

        } catch (error) {
            console.error(error)
        }
    }

    const handleCreate = async () => {
        if (!form.student || !form.course) {
            setMessage('⚠️ Selecciona estudiante y curso')
            return
        }

        if (!window.confirm('¿Confirmar inscripción?')) return

        const res = await apiFetch('/enrollments', {
            method: 'POST',
            body: JSON.stringify(form)
        })

        const data = await res.json().catch(() => null)

        if (!res.ok) {
            setMessage(data?.message || '❌ Error al inscribir')
            return
        }

        setMessage('✅ Inscripción realizada correctamente')
        setForm({ student: '', course: '' })
        fetchData()
    }

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar inscripción?')) return

        await apiFetch(`/enrollments/${id}`, { method: 'DELETE' })
        setMessage('🗑️ Inscripción eliminada')
        fetchData()
    }

    // 🔍 FILTRO + BUSCADOR
    const filteredEnrollments = enrollments.filter(e => {
        const studentName = `${e.student?.firstName || ''} ${e.student?.lastName || ''}`.toLowerCase()
        const courseName = `${e.course?.description || ''}`.toLowerCase()

        const matchSearch =
            studentName.includes(search.toLowerCase()) ||
            courseName.includes(search.toLowerCase())

        const matchCourse = filterCourse ? e.course?._id === filterCourse : true

        return matchSearch && matchCourse
    })

    return (
        <div className="enrollment-page">
            <Navbar />

            <div className="enrollment-content">
                <h1>Inscripciones</h1>

                {/* CONTADOR */}
                <div className="enrollment-stats">
                    Total: {filteredEnrollments.length}
                </div>

                {/* MENSAJE */}
                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                {/* FILTROS */}
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Buscar estudiante o curso..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={filterCourse}
                        onChange={(e) => setFilterCourse(e.target.value)}
                    >
                        <option value="">Todos los cursos</option>
                        {courses.map(c => (
                            <option key={c._id} value={c._id}>
                                {c.description}
                            </option>
                        ))}
                    </select>
                </div>

                {/* FORM */}
                <div className="enrollment-form">
                    <select
                        value={form.student}
                        onChange={(e) => setForm({ ...form, student: e.target.value })}
                    >
                        <option value="">Seleccionar estudiante</option>
                        {students.map(s => (
                            <option key={s._id} value={s._id}>
                                {s.firstName} {s.lastName}
                            </option>
                        ))}
                    </select>

                    <select
                        value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                    >
                        <option value="">Seleccionar curso</option>
                        {courses.map(c => (
                            <option key={c._id} value={c._id}>
                                {c.description}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleCreate}>Inscribir</button>
                </div>

                {/* TABLA */}
                <div className="enrollment-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Estudiante</th>
                                <th>Curso</th>
                                <th>Fecha</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredEnrollments.length === 0 ? (
                                <tr className="empty-row">
                                    <td colSpan="4">No hay resultados</td>
                                </tr>
                            ) : (
                                filteredEnrollments.map(e => (
                                    <tr key={e._id}>
                                        <td className="student-name">
                                            {e.student
                                                ? `${e.student.firstName} ${e.student.lastName}`
                                                : 'Sin datos'}
                                        </td>

                                        <td className="course-name">
                                            {e.course?.description || 'Sin curso'}
                                        </td>

                                        <td className="enrollment-date">
                                            {new Date(e.createdAt).toLocaleDateString()}
                                        </td>

                                        <td>
                                            <button onClick={() => handleDelete(e._id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EnrollmentPage