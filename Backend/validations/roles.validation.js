import { body } from 'express-validator';

export const rolValidations = [
    body('type')
        .notEmpty().withMessage('El tipo de rol es requerido')
        .isString().withMessage('El tipo debe ser una cadena de texto')
        .trim()
        .toLowerCase()
        .isIn(["admin", "teacher", "student"]).withMessage('El tipo de rol debe ser: prof, adm o est')
]