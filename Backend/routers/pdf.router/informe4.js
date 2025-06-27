import PDFDocument from 'pdfkit';
import mongoose from 'mongoose';
import { schedule } from '../../db/coursesSchedule.js';
import { user } from '../../db/users.js';

export const reportStudentGrades = async (req, res) => {
    const { studentsId } = req.params;

    try {
        const studentObjectId = new mongoose.Types.ObjectId(studentsId);

        // Buscar datos del estudiante
        const studentData = await user.findById(studentObjectId);
        if (!studentData) return res.status(404).json({ message: 'Estudiante no encontrado' });

        // Buscar notas e historial de cursos
        const results = await schedule.aggregate([
            {
                $match: {
                    students: {
                        $elemMatch: {
                            student: studentObjectId
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'course',
                    foreignField: '_id',
                    as: 'courseInfo'
                }
            },
            { $unwind: '$courseInfo' },
            {
                $project: {
                    courseCode: '$courseInfo.code',
                    courseName: '$courseInfo.description',
                    weight: '$courseInfo.weight',
                    startDate: 1,
                    endDate: 1,
                    studentData: {
                        $filter: {
                            input: '$students',
                            as: 's',
                            cond: { $eq: ['$$s.student', studentObjectId] }
                        }
                    }
                }
            },
            { $unwind: '$studentData' },
            {
                $project: {
                    courseCode: 1,
                    courseName: 1,
                    weight: 1,
                    startDate: 1,
                    endDate: 1,
                    score: '$studentData.score',
                    registerDate: '$studentData.registerDate'
                }
            }
        ]);

        if (!results.length) {
            return res.status(404).json({ message: 'Estudiante no encontrado o sin notas' });
        }

        // Calcular promedio ponderado
        const totalPeso = results.reduce((sum, r) => sum + r.weight, 0);
        const promedioPonderado = results.reduce((sum, r) => sum + (r.score * r.weight), 0) / totalPeso;

        // Generar PDF
        const doc = new PDFDocument({ margin: 50 });
        res.setHeader('Content-Disposition', 'attachment; filename=registro_notas.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);

        doc.fontSize(18).text('Registro Académico del Estudiante', { align: 'center' }).moveDown();

        doc.fontSize(12).text(`Identificación: ${studentData.identification.type} ${studentData.identification.number}`);
        doc.text(`Código: ${studentData.codeUser}`);
        doc.text(`Nombre: ${studentData.firstName} ${studentData.lastName}`);
        doc.text(`Fecha de Registro: ${new Date(results[0].registerDate).toLocaleDateString()}`);
        doc.text(`Promedio Ponderado: ${promedioPonderado.toFixed(2)}`).moveDown();

        doc.fontSize(14).text('Cursos Vistos:', { underline: true }).moveDown(0.5);

        results.forEach((c, i) => {
            doc.fontSize(12).text(`${i + 1}. ${c.courseCode} - ${c.courseName}`);
            doc.text(`   Inicio: ${new Date(c.startDate).toLocaleDateString()} - Fin: ${new Date(c.endDate).toLocaleDateString()}`);
            doc.text(`   Peso: ${c.weight}, Calificación: ${c.score}`).moveDown(0.5);
        });

        doc.end();
    } catch (err) {
        res.status(500).json({ message: 'Error generando PDF', error: err.message });
    }
};
