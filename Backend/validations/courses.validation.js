import { body } from "express-validator";

export const courseValidations = [
    body('code')
        .notEmpty().withMessage('El código del curso es requerido')
        .isString().withMessage('El código debe ser una cadena de texto')
        .trim()
        .isLength({ max: 20 }).withMessage('El código no debe exceder los 20 caracteres'),

    body('description')
        .notEmpty().withMessage('La descripción es requerida')
        .isString().withMessage('La descripción debe ser una cadena de texto')
        .trim()
        .isLength({ max: 500 }).withMessage('La descripción no debe exceder los 500 caracteres'),

    body('intensity')
        .notEmpty().withMessage('La intensidad es requerida')
        .isInt({ min: 1, max: 100 }).withMessage('La intensidad debe ser un número entre 1 y 100'),

    body('weight')
        .notEmpty().withMessage('El peso es requerido')
        .isFloat({ min: 0.1, max: 10 }).withMessage('El peso debe ser un número entre 0.1 y 10'),

    body('active')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano'),

    body('topics')
        .optional()
        .isArray().withMessage('Los temas deben ser un arreglo'),

    body('topics.*.code')
        .notEmpty().withMessage('El código del tema es requerido')
        .isString().withMessage('El código del tema debe ser una cadena de texto')
        .trim()
        .isLength({ max: 20 }).withMessage('El código del tema no debe exceder los 20 caracteres'),

    body('topics.*.title')
        .notEmpty().withMessage('El título del tema es requerido')
        .isString().withMessage('El título del tema debe ser una cadena de texto')
        .trim()
        .isLength({ max: 100 }).withMessage('El título del tema no debe exceder los 100 caracteres'),

    body('topics.*.description')
        .optional()
        .isString().withMessage('La descripción del tema debe ser una cadena de texto')
        .trim()
        .isLength({ max: 500 }).withMessage('La descripción del tema no debe exceder los 500 caracteres'),

    body('topics.*.active')
        .optional()
        .isBoolean().withMessage('El estado activo del tema debe ser un valor booleano')
]