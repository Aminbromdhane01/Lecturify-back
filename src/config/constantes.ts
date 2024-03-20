export const envConstants = {
    PORT: 'PORT',

    DataBase: {
        DATABASE_TYPE: 'DATABASE_TYPE',
        DATABASE_HOST: 'DATABASE_HOST',
        DATABASE_PORT: 'DATABASE_PORT',
        DATABASE_USERNAME: 'DATABASE_USERNAME',
        DATABASE_PASSWORD: 'DATABASE_PASSWORD',
        DATABASE_NAME: 'DATABASE_NAME',
    },
    JWT: {
        JWT_REFRESH_SECRET: 'JWT_REFRESH_SECRET',
        JWT_ACCESS_SECRET: 'JWT_ACCESS_SECRET',
    },
    MailModule: {
        MAIL_HOST: 'MAIL_HOST',
        USER_EMAIL: 'USER_EMAIL',
        USER_PASSWORD: 'USER_PASSWORD',
        EMAIL_FROM: 'EMAIL_FROM',
        MAIL_TOKEN: 'MAIL_TOKEN',
        RESET_PASSWORD_URL: 'RESET_PASSWORD_URL',
        EMAIL_PORT: 'EMAIL_PORT',

    },
    AuthModule: {
        AUTH_SERVICE: 'AUTH_SERVICE',

    },

    HttpExceptionsMessage: {
        USER_ALREADY_EXISTS: 'User already exists',
        INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
        USER_NOT_FOUND: 'User not found',
        ACCESS_DENIED: 'Access denied',
        PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
        USER_NOT_FOUND_OR_TOKEN_EXPIRED: 'User not found or token expired',
        AUTH_SERVICE_TOKEN: 'AUTH_SERVICE',
    },
    UserModule: {
        PASSWORD_REG_EX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        PASSWORD_ERROR_MESSAGE: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
        FIRSTNAME_ERROR_MESSAGE: 'First name is required',
        LASTNAME_ERROR_MESSAGE: 'Last name is required',
        EMAIL_ERROR_MESSAGE: 'Email address is required'
    },
    Swagger: {
        SWAGGER_TITLE: 'Lecturify',
        SWAGGER_DESCRIPTION: 'Lecturify API description',
        SWAGGER_TAG: 'LEC',
        SWAGGER_VERSION: '1.0'

    },
    Bcrypt: {
        BCRYPT: 'bcrypt',
    }

};
