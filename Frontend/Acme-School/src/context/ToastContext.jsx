import { createContext, useCallback, useContext, useState } from 'react'
import './ToastContext.css'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const showToast = useCallback((message, options = {}) => {
        const { type = 'info', duration = 4500 } = options
        const text = typeof message === 'string' ? message : String(message ?? '')
        const id = ++toastId
        setToasts((prev) => [...prev, { id, message: text, type }])
        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id))
            }, duration)
        }
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-stack" aria-live="polite">
                {toasts.map((t) => (
                    <div key={t.id} className={`toast toast--${t.type}`} role="status">
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) {
        throw new Error('useToast debe usarse dentro de ToastProvider')
    }
    return ctx
}
