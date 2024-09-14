import { auth0 } from './envs';

export const config = {
    authRequired: false,
    auth0Logout: true,
    secret: auth0.secret,
    baseURL: auth0.audience,
    clientID: auth0.clientId,
    issuerBaseURL: auth0.baseUrl,
};