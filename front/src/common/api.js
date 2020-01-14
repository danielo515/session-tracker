import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    useAuth: true
})

const formatError = ({ response, request }) => ({ error: { data: response.data, status: request.status } })
const formatResponse = ({ data }) => ({ response: data })

export const login = ({ email, password }) =>
    api.post('login', { email, password })
        .then(formatResponse)
        .catch(formatError)

export const signUp = ({ email, password, name }) =>
    api.post('users', { email, password, name })
        .then(formatResponse)
        .catch(formatError)

export const me = ({ token }) =>
    api.get('me', { headers: { Authorization: `Bearer ${token}` } })
        .then(formatResponse)
        .catch(formatError)

export const listSessions = ({ token }) =>
    api.get('/sessions', { headers: { Authorization: `Bearer ${token}` } })
        .then(formatResponse)
        .catch(formatError)

export const startSession = ({ token, name }) =>
    api.post('/sessions', { name, startDate: (new Date()).toISOString() }, { headers: { Authorization: `Bearer ${token}` } })
        .then(formatResponse)
        .catch(formatError)

export const stopSession = ({ token, id, name }) =>
    api.patch(`/sessions/${id}`, { name, endDate: (new Date()).toISOString() }, { headers: { Authorization: `Bearer ${token}` } })
        .then(formatResponse)
        .catch(formatError)

export const deleteSession = ({ token, id }) =>
    api.delete(`/sessions/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(formatResponse)
        .catch(formatError)