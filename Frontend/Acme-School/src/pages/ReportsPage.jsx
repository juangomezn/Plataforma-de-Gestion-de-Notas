import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { apiFetch } from '../api/client'
import './ReportsPage.css'

const ReportsPage = () => {

    const [dates, setDates] = useState({
        startDate: '',
        endDate: ''
    })

    const [loading, setLoading] = useState(false)

    // 🔥 DESCARGAR PDF
    const downloadReport = async (url) => {
        try {
            setLoading(true)

            const res = await apiFetch(url)

            if (!res.ok) {
                alert('Error generando reporte')
                return
            }

            const blob = await res.blob()
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'reporte.pdf'
            link.click()

        } catch (error) {
            console.error(error)
            alert('Error de conexión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="reports-page">
            <Navbar />

            <div className="reports-content">
                <h1>Reportes</h1>

                {/* REPORTE 1 */}
                <div className="report-card">
                    <h3>Cursos por rango de fechas</h3>

                    <div className="filters">
                        <input
                            type="date"
                            value={dates.startDate}
                            onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                        />

                        <input
                            type="date"
                            value={dates.endDate}
                            onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                        />
                    </div>

                    <button
                        onClick={() =>
                            downloadReport(
                                `/pdfs/courses?startDate=${dates.startDate}&endDate=${dates.endDate}`
                            )
                        }
                    >
                        Generar PDF
                    </button>
                </div>

                {/* REPORTE 2 */}
                <div className="report-card">
                    <h3>Temas de un curso</h3>

                    <button
                        onClick={() => downloadReport('/pdfs/courses/ABC123')}
                    >
                        Generar PDF
                    </button>
                </div>

                {/* REPORTE 3 */}
                <div className="report-card">
                    <h3>Detalle curso por profesor</h3>

                    <button
                        onClick={() => downloadReport('/pdfs/courses/IDCURSO/teacher/IDPROF')}
                    >
                        Generar PDF
                    </button>
                </div>

                {/* REPORTE 4 */}
                <div className="report-card">
                    <h3>Notas de estudiante</h3>

                    <button
                        onClick={() => downloadReport('/pdfs/students/IDSTUDENT/grades')}
                    >
                        Generar PDF
                    </button>
                </div>

                {loading && <p className="loading">Generando reporte...</p>}
            </div>
        </div>
    )
}

export default ReportsPage