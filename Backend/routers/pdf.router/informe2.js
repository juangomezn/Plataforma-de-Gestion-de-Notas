import PDFDocument from 'pdfkit';
import { course } from '../../db/courses.js'; 

export const reportCourseTopics = async (req, res) => {
  const { code } = req.params;

  try {
    const courses = await course.findOne({ code }); 

    if (!courses) return res.status(404).json({ message: 'Curso no encontrado' });

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Disposition', 'attachment; filename=contenido_curso.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(16).text(`Curso: ${courses.code} - ${courses.description}`, { align: 'center' }).moveDown();
    doc.fontSize(12).text(`Intensidad: ${courses.intensity}, Peso: ${courses.weight}`);
    doc.moveDown().text('Contenido temático:', { underline: true }).moveDown(0.5);

    courses.topics.forEach((t, i) => {
      doc.text(`${i + 1}. ${t.title} (${t.code})`);
      doc.text(`   ${t.description}`).moveDown(0.3);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: 'Error generando PDF', error: err.message });
  }
};
