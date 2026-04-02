import { user } from '../db/users.js'

export function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'No autenticado' })
    }
    next()
}

export function requireRole(...allowedTypes) {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' })
        }
        try {
            const u = await user.findById(req.user._id).populate('rol')
            const roleType = u?.rol?.type
            if (!roleType || !allowedTypes.includes(roleType)) {
                return res.status(403).json({ message: 'No autorizado' })
            }
            next()
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}

export async function requireSelfOrAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'No autenticado' })
    }
    const paramId = req.params._id
    if (req.user._id.toString() === paramId) {
        return next()
    }
    try {
        const u = await user.findById(req.user._id).populate('rol')
        if (u?.rol?.type === 'admin') {
            return next()
        }
        return res.status(403).json({ message: 'No autorizado' })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

/** Informe de notas: admin y docentes ven cualquier estudiante; el estudiante solo el suyo. */
export async function requireStudentGradesAccess(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'No autenticado' })
    }
    const studentId = req.params.studentsId
    try {
        const u = await user.findById(req.user._id).populate('rol')
        const roleType = u?.rol?.type
        if (roleType === 'admin' || roleType === 'teacher') {
            return next()
        }
        if (roleType === 'student' && req.user._id.toString() === studentId) {
            return next()
        }
        return res.status(403).json({ message: 'No autorizado' })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
