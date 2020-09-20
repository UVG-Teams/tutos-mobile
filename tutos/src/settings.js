import { LOCAL_URL } from './localsettings'

// export const API_BASE_URL = 'http://localhost:8000/api'
export const API_BASE_URL = LOCAL_URL

// Django token expiration = 1800 seconds
export const tokenReviewTime = 300 * 1000 // Seconds * 1000

// Porcentaje de vida util del tiempo
// antes de validar token
export const validTimePercentage = 0.75
