import { body } from 'express-validator'

export const userValidations = [
    body('rol')
        .notEmpty().withMessage('El ID del curso es requerido')
        .isMongoId().withMessage('El ID del curso debe ser un ObjectId válido'),

    body('codeUser')
        .notEmpty().withMessage('El código de usuario es requerido')
        .isString().withMessage('El código debe ser una cadena de texto')
        .trim()
        .isLength({ max: 20 }).withMessage('El código no debe exceder los 20 caracteres'),

    body('firstName')
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .trim()
        .isLength({ max: 50 }).withMessage('El nombre no debe exceder los 50 caracteres'),

    body('lastName')
        .notEmpty().withMessage('El apellido es requerido')
        .isString().withMessage('El apellido debe ser una cadena de texto')
        .trim()
        .isLength({ max: 50 }).withMessage('El apellido no debe exceder los 50 caracteres'),

    body('identification.type')
        .notEmpty().withMessage('El tipo de identificación es requerido')
        .isString().withMessage('El tipo debe ser una cadena de texto')
        .trim()
        .isLength({ max: 10 }).withMessage('El tipo no debe exceder los 10 caracteres'),

    body('identification.number')
        .notEmpty().withMessage('El número de identificación es requerido')
        .isString().withMessage('El número debe ser una cadena de texto')
        .trim()
        .isLength({ max: 20 }).withMessage('El número no debe exceder los 20 caracteres'),

    body('gender')
        .optional()
        .isString().withMessage('El género debe ser una cadena de texto')
        .trim()
        .isLength({ max: 20 }).withMessage('El género no debe exceder los 20 caracteres'),

    body('birthdate')
        .notEmpty().withMessage('La fecha de nacimiento es requerida')
        .isISO8601().withMessage('La fecha debe tener formato ISO8601 (YYYY-MM-DD)'),

    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe ser un email válido')
        .normalizeEmail(),

    body('address.street')
        .notEmpty().withMessage('La calle es requerida')
        .isString().withMessage('La calle debe ser una cadena de texto')
        .trim()
        .isLength({ max: 100 }).withMessage('La calle no debe exceder los 100 caracteres'),

    body('address.number')
        .optional()
        .isString().withMessage('El número debe ser una cadena de texto')
        .trim()
        .isLength({ max: 10 }).withMessage('El número no debe exceder los 10 caracteres'),

    body('city.code')
        .notEmpty().withMessage('El código de ciudad es requerido')
        .isString().withMessage('El código debe ser una cadena de texto')
        .trim()
        .isLength({ max: 10 }).withMessage('El código no debe exceder los 10 caracteres'),

    body('city.name')
        .notEmpty().withMessage('El nombre de ciudad es requerido')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .trim()
        .isLength({ max: 50 }).withMessage('El nombre no debe exceder los 50 caracteres')
]