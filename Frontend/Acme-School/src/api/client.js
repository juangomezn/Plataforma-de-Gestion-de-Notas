const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export function apiUrl(path) {
    const p = path.startsWith('/') ? path : `/${path}`
    return `${BASE}${p}`
}

export async function apiFetch(path, options = {}) {
    const url = apiUrl(path)
    const headers = { ...options.headers }
    if (options.body && typeof options.body === 'string' && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json'
    }
    return fetch(url, {
        ...options,
        headers,
        credentials: 'include',
    })
}
