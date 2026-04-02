const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export function apiUrl(path) {
    const p = path.startsWith('/') ? path : `/${path}`
    return `${BASE}${p}`
}

/** Rutas donde 401 es esperado y no debe redirigir al login */
function isAuthCheckPath(path) {
    const normalized = path.split('?')[0]
    return normalized === '/auth/me'
}

/**
 * @param {string} path
 * @param {RequestInit & { skipAuthHandling?: boolean }} [options]
 */
export async function apiFetch(path, options = {}) {
    const { skipAuthHandling = false, ...fetchOptions } = options
    const url = apiUrl(path)
    const headers = { ...fetchOptions.headers }
    if (fetchOptions.body && typeof fetchOptions.body === 'string' && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json'
    }

    const res = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials: 'include',
    })

    if (skipAuthHandling) {
        return res
    }

    if (res.status === 401 && !isAuthCheckPath(path)) {
        window.dispatchEvent(new CustomEvent('api:unauthorized'))
    }
    if (res.status === 403) {
        window.dispatchEvent(new CustomEvent('api:forbidden'))
    }

    return res
}
