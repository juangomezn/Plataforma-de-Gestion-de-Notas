import { body } from 'express-validator';

export const courseScheduleValidations = [
    body('code')
        .notEmpty().withMessage('El código del horario es requerido')
        .isString().withMessage('El código debe ser una cadena de texto')
        .trim()
        .isLength({ max: 20 }).withMessage('El código no debe exceder los 20 caracteres'),

    body('course')
        .notEmpty().withMessage('El ID del curso es requerido')
        .isMongoId().withMessage('El ID del curso debe ser un ObjectId válido'),

    body('classroom.code')
        .notEmpty().withMessage('El código del aula es requerido')
        .isString().withMessage('El código del aula debe ser una cadena de texto')
        .trim()
        .isLength({ max: 20 }).withMessage('El código del aula no debe exceder los 20 caracteres'),

    body('classroom.description')
        .optional()
        .isString().withMessage('La descripción del aula debe ser una cadena de texto')
        .trim()
        .isLength({ max: 200 }).withMessage('La descripción del aula no debe exceder los 200 caracteres'),

    body('classroom.capacity')
        .notEmpty().withMessage('La capacidad del aula es requerida')
        .isInt({ min: 1, max: 200 }).withMessage('La capacidad debe ser un número entre 1 y 200'),

    body('classroom.active')
        .optional()
        .isBoolean().withMessage('El estado activo del aula debe ser un valor booleano'),

    body('active')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano'),

    body('teacher')
        .notEmpty().withMessage('El ID del profesor es requerido')
        .isMongoId().withMessage('El ID del profesor debe ser un ObjectId válido'),

    body('students')
        .optional()
        .isArray().withMessage('Los estudiantes deben ser un arreglo'),

    body('students.*.student')
        .notEmpty().withMessage('El ID del estudiante es requerido')
        .isMongoId().withMessage('El ID del estudiante debe ser un ObjectId válido'),

    body('students.*.registerDate')
        .notEmpty().withMessage('La fecha de registro es requerida')
        .isISO8601().withMessage('La fecha de registro debe tener formato ISO8601'),

    body('students.*.score')
        .optional()
        .isFloat({ min: 0, max: 5 }).withMessage('La calificación debe ser un número entre 0 y 5'),

    body('students.*.comments')
        .optional()
        .isString().withMessage('Los comentarios deben ser una cadena de texto')
        .trim()
        .isLength({ max: 500 }).withMessage('Los comentarios no deben exceder los 500 caracteres'),

    body('startDate')
        .notEmpty().withMessage('La fecha de inicio es requerida')
        .isISO8601().withMessage('La fecha debe tener formato ISO8601')
        .toDate(),

    body('endDate')
        .notEmpty().withMessage('La fecha de fin es requerida')
        .isISO8601().withMessage('La fecha debe tener formato ISO8601')
        .toDate()
        .custom((value, { req }) => {
            if (value <= req.body.startDate) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }
            return true;
        })
];
