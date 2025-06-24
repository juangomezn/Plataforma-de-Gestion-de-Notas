import { user } from '../db/users.js'

const rolePrefixes = {
    '685741f6742f783de332f842': 'ADM', 
    '68589a9fc21e9559fadca98b': 'TEA', 
    '68589aa8c21e9559fadca98d': 'STU'  
}

export async function generateCodeUser(rolId) {
    const prefix = rolePrefixes[rolId]

    if (!prefix) throw new Error('Rol no reconocido para generar codeUser.')


    const lastUser = await user.findOne({ codeUser: new RegExp(`^${prefix}`) })
        .sort({ codeUser: -1 })
        .collation({ locale: 'en', numericOrdering: true })

    let nextNumber = 1

    if (lastUser && lastUser.codeUser) {
        const lastNumber = parseInt(lastUser.codeUser.slice(3)) || 0
        nextNumber = lastNumber + 1
    }

    const code = `${prefix}${String(nextNumber).padStart(3, '0')}`
    return code
}
