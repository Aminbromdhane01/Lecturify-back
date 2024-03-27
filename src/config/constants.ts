export const envConstants = {
    Global: {
        PORT: 3000
    },
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
        RESET_TOKEN_DESCRIPTION: 'The token for password reset.',
        RESET_TOKEN_EXAMPLE: 'abc123token',
        NEW_PASSWORD_DESCRIPTION: 'The new password for the user.',
        CONFIRM_PASSWORD_DESCRIPTION: 'Confirmation of the new password.',
        PASSWORD_EXAMPLE: 'NewPassword123@',
        EMAIL_DESCRIPTION: 'The email address of the user.',
        EMAIL_EXAMPLE: 'example@example.com',
        PASSWORD_DESCRIPTION: 'The password of the user.',
        REFRESH_TOKEN_DESCRIPTION: 'The refresh token for the user session.',
        ACCESS_TOKEN_DESCRIPTION: 'The access token for the user session.',
        TOKEN_EXAMPLE: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        RESET_TOKEN_EXPIRE_IN: 'RESET_TOKEN_EXPIRE_IN',
        RESET_TOKEN_SECRET_KEY: 'RESET_TOKEN_SECRET_KEY',
        INAVALID_EMAIL_MESSAGE: 'Invalid email address format'
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
        EMAIL_ERROR_MESSAGE: 'Email address is required',
        FIRSTNAME_DESCRIPTION: 'User First Name ',
        FIRSTNAME_EXAMPLE: 'First Name ',
        LASTNAME_DESCRIPTION: 'User Last Name ',
        LASTNAME_EXAMPLE: 'Last Name '
    },
    Swagger: {
        SWAGGER_TITLE: 'Lecturify',
        SWAGGER_DESCRIPTION: 'Lecturify API description',
        SWAGGER_TAG: 'LEC',
        SWAGGER_VERSION: '1.0'

    },
    Bcrypt: {
        BCRYPT: 'bcrypt',
        SALT_ROUNDS: 'SALT_ROUNDS',
    },
    validationDecorators: {
        IS_STRING_MESSAGE: 'must be a string',
        IS_STRING_WITH_MESSAGE_NAME: 'isStringWithMessage',
        IS_NOTEMPTY_MESSAGE: 'must not be empty',
        IS_NOTEMPTY_WITH_MESSAGE_NAME: 'isNotEmptyWithMessage'

    }

};
