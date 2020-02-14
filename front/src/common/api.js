import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import Api from '@aws-amplify/api';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID,

    },
    API: {
        endpoints: [
            {
                name: "sessions",
                endpoint: process.env.REACT_APP_BACKEND_URL,
                region: process.env.REACT_APP_REGION
            },
        ]
    }
});

const formatError = (error) => ({ error })
const formatResponse = (response) => ({ response })

export const login = ({ email, password }) =>
    Auth.signIn({ username: email, password })
        .then(({ signInUserSession }) => ({ response: { token: signInUserSession } }))
        .catch(formatError)

export const signUp = ({ email, password, name }) =>
    Auth.signUp({ username: email, password, attributes: { name } })
        .then(formatResponse)
        .catch(formatError)

export const me = ({ token }) =>
    Api.get('sessions', '/me')
        .then(formatResponse)
        .catch(formatError)

export const listSessions = ({ token }) =>
    Api.get('sessions', '/sessions')
        .then(formatResponse)
        .catch(formatError)

export const startSession = ({ token, name }) =>
    Api.post('sessions', '/sessions', { body: { name, startDate: (new Date()).toISOString() } })
        .then(formatResponse)
        .catch(formatError)

export const stopSession = ({ token, id, name }) =>
    Api.patch('sessions', `/sessions/${id}`, { body: { name, endDate: (new Date()).toISOString() } })
        .then(formatResponse)
        .catch(formatError)

export const deleteSession = ({ token, id }) =>
    Api.delete('sessions', `/sessions/${id}`)
        .then(formatResponse)
        .catch(formatError)