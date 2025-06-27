import PDFDocument from 'pdfkit';
import { schedule } from '../../db/coursesSchedule.js';

export const reportCoursesBetweenDates = async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) return res.status(400).json({ message: 'Fechas requeridas' });

    try {
        const cursos = await schedule.aggregate([
            {
                $match: {
                    startDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                $lookup: {
                    from: 'courses', localField: 'course', foreignField: '_id', as: 'courseData'
                }
            },
            { $unwind: '$courseData' },
            {
                $lookup: {
                    from: 'users', localField: 'teacher', foreignField: '_id', as: 'teacherData'
                }
            },
            { $unwind: '$teacherData' },
            {
                $project: {
                    courseCode: '$courseData.code',
                    courseName: '$courseData.description',
                    intensity: '$courseData.intensity',
                    weight: '$courseData.weight',
                    teacherName: { $concat: ['$teacherData.firstName', ' ', '$teacherData.lastName'] },
                    teacherEmail: '$teacherData.email',
                    classroomCode: '$classroom.code',
                    classroomDescription: '$classroom.description',
                    startDate: 1,
                    endDate: 1,
                    studentCount: { $size: '$students' }
                }
            }
        ]);

        const doc = new PDFDocument({ margin: 50 });
        res.setHeader('Content-Disposition', 'attachment; filename=cursos_programados.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);

        doc.fontSize(18).text('Informe de Cursos Programados', { align: 'center' }).moveDown();
        cursos.forEach((c, i) => {
            doc.fontSize(12).text(`Curso ${i + 1}: ${c.courseName}`);
            doc.text(`Código: ${c.courseCode}`);
            doc.text(`Intensidad: ${c.intensity}, Peso: ${c.weight}`);
            doc.text(`Profesor: ${c.teacherName} (${c.teacherEmail})`);
            doc.text(`Aula: ${c.classroomCode} - ${c.classroomDescription}`);
            doc.text(`Fechas: ${new Date(c.startDate).toLocaleDateString()} a ${new Date(c.endDate).toLocaleDateString()}`);
            doc.text(`Estudiantes inscritos: ${c.studentCount}`).moveDown();
        });

        doc.end();
    } catch (err) {
        res.status(500).json({ message: 'Error generando PDF', error: err.message });
    }
};