import PDFDocument from 'pdfkit';
import { schedule } from '../../db/coursesSchedule.js';
import mongoose from "mongoose";

export const reportCourseDetailByTeacher = async (req, res) => {
    const { teacherId, courseId } = req.params;
    const { date } = req.query;

    try {
        const data = await schedule.aggregate([
            {
                $match: {
                    teacher: new mongoose.Types.ObjectId(teacherId),
                    course: new mongoose.Types.ObjectId(courseId),
                    startDate: { $gte: new Date(date) }
                }
            },
            { $unwind: '$students' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'students.student',
                    foreignField: '_id',
                    as: 'studentInfo'
                }
            },
            { $unwind: '$studentInfo' },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'course',
                    foreignField: '_id',
                    as: 'courseData'
                }
            },
            { $unwind: '$courseData' },
            {
                $group: {
                    _id: '$_id',
                    course: { $first: '$courseData' },
                    startDate: { $first: '$startDate' },
                    endDate: { $first: '$endDate' },
                    classroom: { $first: '$classroom.code' },
                    students: {
                        $push: {
                            codeUser: '$studentInfo.codeUser',
                            firstName: '$studentInfo.firstName',
                            lastName: '$studentInfo.lastName',
                            email: '$studentInfo.email',
                            registerDate: '$students.registerDate'
                        }
                    }
                }
            }
        ]);

        if (!data.length) return res.status(404).json({ message: 'No hay datos para los filtros indicados' });
        const d = data[0];

        const doc = new PDFDocument({ margin: 50 });
        res.setHeader('Content-Disposition', 'attachment; filename=detalle_curso.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);

        doc.fontSize(16).text(`Detalle del Curso ${d.course.code}`, { align: 'center' });
        doc.moveDown().fontSize(12);
        doc.text(`Nombre: ${d.course.description}`);
        doc.text(`Intensidad: ${d.course.intensity}`);
        doc.text(`Fechas: ${new Date(d.startDate).toLocaleDateString()} a ${new Date(d.endDate).toLocaleDateString()}`);
        doc.text(`Aula: ${d.classroom}`);
        doc.moveDown();

        doc.text('Estudiantes:', { underline: true });
        d.students.forEach((s, i) => {
            doc.text(`${i + 1}. ${s.codeUser} - ${s.firstName} ${s.lastName} - ${s.email} - ${new Date(s.registerDate).toLocaleDateString()}`);
        });

        doc.end();
    } catch (err) {
        res.status(500).json({ message: 'Error generando PDF', error: err.message });
    }
};
