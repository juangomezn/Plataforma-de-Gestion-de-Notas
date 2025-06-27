import express from 'express';
import { reportCoursesBetweenDates } from '../pdf.router/informe1.js';
import { reportCourseTopics } from '../pdf.router/informe2.js';
import { reportCourseDetailByTeacher } from '../pdf.router/Informe3.js';
import { reportStudentGrades } from '../pdf.router/Informe4.js';

const router = express.Router();

router.get('/courses', reportCoursesBetweenDates);
router.get('/courses/:code', reportCourseTopics);
router.get('/courses/:courseId/teacher/:teacherId', reportCourseDetailByTeacher);
router.get('/students/:studentsId/grades', reportStudentGrades);

export default router;
