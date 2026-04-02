import express from 'express'
import { reportCoursesBetweenDates } from './informe1.js'
import { reportCourseTopics } from './informe2.js'
import { reportCourseDetailByTeacher } from './informe3.js'
import { reportStudentGrades } from './informe4.js'
import { requireAuth, requireRole, requireStudentGradesAccess } from '../../middleware/auth.middleware.js'

const router = express.Router()

router.get('/courses', requireAuth, requireRole('admin', 'teacher'), reportCoursesBetweenDates)
router.get('/courses/:code', requireAuth, requireRole('admin', 'teacher'), reportCourseTopics)
router.get(
    '/courses/:courseId/teacher/:teacherId',
    requireAuth,
    requireRole('admin', 'teacher'),
    reportCourseDetailByTeacher
)
router.get('/students/:studentsId/grades', requireAuth, requireStudentGradesAccess, reportStudentGrades)

export default router
