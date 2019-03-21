export const SWAGGER_PATH = "/api-docs/swagger";
export const SWAGGER_ASSETS_PATH = "/api-docs/swagger/assets";
export const SWAGGER_ROOT_FOLDER = "swagger";
export const SWAGGER_UI_DIST_FOLDER = "node_modules/swagger-ui-dist";
export const TOTAL_HEADER_NAME = "x-total-count";
const session = require('express-session');

export const SESSION_OPTIONS = {
    store: new (require('connect-pg-simple')(session))(),
    name: 'sessionId',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: process.env.NODE_ENV === 'production', // true only on production mode, requires https
        secure: false,
        maxAge: 1 * 60 * 60 * 1000, // 1 hour
        httpOnly: true
    }
};
