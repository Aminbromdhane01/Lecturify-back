import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
    PORT: Joi.number().required(),
    DATABASE_TYPE: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.required(),
    DATABASE_NAME: Joi.string().required(),
    JWT_ACCESS_SECRET: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    RESET_PASSWORD_URL: Joi.string().required(),
    MAIL_HOST: Joi.string().required(),
    USER_EMAIL: Joi.string().required(),
    USER_PASSWORD: Joi.string().required(),
    EMAIL_FROM: Joi.string().required(),
    EMAIL_PORT: Joi.number().required(),
    SALT_ROUNDS: Joi.number().required(),
    RESET_TOKEN_EXPIRE_IN: Joi.string().required(),
    RESET_TOKEN_SECRET_KEY: Joi.string().required(),

});