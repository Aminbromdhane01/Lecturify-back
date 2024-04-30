export const envConstants = {
  Global: {
    PORT: 3000,
  },
  PORT: 'PORT',
  NODE_ENV: 'NODE_ENV',
  PRODUCTION: 'production',

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
    EMAIL_NOT_SENT: 'Error in sending reset mail',
    EMAIL_SENT:
      'Your password reset request has been successfully processed. Please check your inbox for further instructions.',
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
    INAVALID_EMAIL_MESSAGE: 'Invalid email address format',
    USER_ID_ARG: 'sub',
    REFRESH_TOKEN_ARG: 'refreshToken',
    FULL_NAME_DESCRIPTION: 'User Full Name',
  },

  HttpExceptionsMessage: {
    USER_ALREADY_EXISTS: 'User already exists',
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
    USER_NOT_FOUND: 'User not found',
    ACCESS_DENIED: 'Access denied',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    USER_NOT_FOUND_OR_TOKEN_EXPIRED: 'User not found or token expired',
    AUTH_SERVICE_TOKEN: 'AUTH_SERVICE',
    INVALID_TOKEN_RESPONSE_MESSAGE: 'Invalid token',
    FAILED_TO_UPDATE_USER_MESSAGE:
      'Failed to update user. Please try again later',
  },
  ErrorMessage: {
    BAD_REQUEST: 'Bad Request',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not Found',
    CONFLICT: 'Conflict',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  },
  UserModule: {
    PASSWORD_REG_EX:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$%&*?@])[\d!$%&*?@A-Za-z]{8,}$/,
    PASSWORD_ERROR_MESSAGE:
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
    FIRSTNAME_ERROR_MESSAGE: 'First name is required',
    LASTNAME_ERROR_MESSAGE: 'Last name is required',
    EMAIL_ERROR_MESSAGE: 'Email address is required',
    FIRSTNAME_DESCRIPTION: 'User First Name ',
    FIRSTNAME_EXAMPLE: 'First Name ',
    LASTNAME_DESCRIPTION: 'User Last Name ',
    LASTNAME_EXAMPLE: 'Last Name ',
  },
  Swagger: {
    SWAGGER_TITLE: 'Lecturify',
    SWAGGER_DESCRIPTION: 'Lecturify API description',
    SWAGGER_TAG: 'LEC',
    SWAGGER_VERSION: '1.0',
  },
  Bcrypt: {
    BCRYPT: 'bcrypt',
    SALT_ROUNDS: 'SALT_ROUNDS',
  },
  validationDecorators: {
    IS_STRING_MESSAGE: 'must be a string',
    IS_STRING_WITH_MESSAGE_NAME: 'isStringWithMessage',
    IS_NOTEMPTY_MESSAGE: 'is required',
    IS_NOTEMPTY_WITH_MESSAGE_NAME: 'isNotEmptyWithMessage',
  },
  Passport: {
    AUTHORIZATION: 'Authorization',
    AUTHORIZATION_HEADER_NOT_PROVIDED: 'Authorization header not provided',
    INVALID_AUTHORIZATION_HEADER_FORMAT:
      'Invalid authorization header format',
    BEARER: 'Bearer',
  },
  Cloudinary: {
    CLOUDINARY: 'Cloudinary',
    CLOUD_NAME: 'CLOUD_NAME',
    CLOUD_KEY: 'CLOUD_KEY',
    CLOUD_SECRET: 'CLOUD_SECRET',
    FILE_UPLOAD_SERVICE: 'FILE_UPLOAD_SERVICE',
    INVALID_URL_ERROR_MESSAGE: 'Invalid Cloudinary URL',
  },
  LocalImageUpload: {
    LOCAL_IMAGE_DELETED_SUCCESSFULY_IMAGE: 'Image deleted successfully',
    LOCAL_IMAGE_NOT_FOUND_MESSAGE: 'Image not found',
    LOCAL_IMAGE_UPLOAD_DESTINATION: 'uploads',
    UPLOADED_FILE_IS_INVALID_MESSAGE: 'Uploaded file is invalid',
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
    ALLOWED_FILE_EXTENSIONS: ['.jpeg', '.jpg', '.png', '.pdf'],
    UPLOADED_FILE_TYPE_IS_NOT_SUPPORTED_MESSAGE:
      'Uploaded file type is not supported',
    UPLOADED_PDF_FILE_MAX_SIZE_MESSSAGE:
      'Uploaded PDF file exceeds maximum size (50MB)',
    UPLOADED_FILE_MAX_SIZE_MESSSAGE:
      'Uploaded image exceeds maximum size (3MB)',
    PDF_MIMETYPE: 'application/pdf',
    FILE_INTERCEPTOR_FIELDNAME: 'file',
    FILES_INTERCEPTOR_FIELDNAME: 'files',
    FIELS_INTERCEPTOR_MAX_COUNT: 10,
    MAX_SIZE_PDF: 'MAC_SIZE_PDF',
    MAX_SIZE_IMAGE: 'MAC_SIZE_IMAGE',
  },
  BookModule: {
    BOOK_TITLE_DESCRIPTION: 'The title of the book',
    BOOK_TITLE_EXAMPLE: 'The Great Gatsby',
    BOOK_CONTENT_DESCRIPTION:
      'The content of the book (generally a PDF file)',
    BOOK_CONTENT_EXAMPLE: 'https://example.com/book.pdf',
    IMAGE_URL_DESCRIPTION: 'The URL of the book image',
    IMAGE_URL_EXAMPLE: 'https://example.com/book-image.jpg',
    IS_URL_ERROR: 'Invalid image URL',
    DATE_DESCRIPTION: 'The publication date of the book',
    DATE_EXAMPLE: '2024-04-23',
    IS_DATE_ERROR: 'Invalid date format',
    GENRE_DESCRIPTION: 'The genre of the book',
    GENRE_EXAMPLE: 'Fiction',
    BOOK_RATING_DESCRIPTION: 'The rating of the book',
    BOOK_RATING_EXAMPLE: 4.5,
    IS_NUMBER_ERROR: 'Rating must be a number',
    RATING_MIN_ERROR: 'Rating must be at least 0',
    RATING_MAX_ERROR: 'Rating must less than or equal to 5',
    RATING_MAX: 5,
    RATING_MIN: 0,
    USER_ID_DESCRIPTION: 'The ID of the user who created the book',
    USER_ID_EXAMPLE: 123,
    BOOK_REPOSITORY: 'BOOK_REPOSITORY',
    BOOK_SERVICE: 'BOOK_SERVICE',
    FILES_ARRAY_TYPE: 'array',
    FILES_ARRAY_ITEMS_TYPE: 'string',
    FILES_ARRAY_ITEMS_FORMAT: 'binary',
    FILES_ARRAY_DESCRIPTION: 'Array of files to upload',
    SwaggerDocumentation: {
      API_OK_RESPONSE_DESCRIPTION: 'List of books found by title',
      ITEM_PER_PAGE_QUERY_NAME: 'itemPerPage',
      ITEM_PER_PAGE_QUERY_DESCRIPTION: 'Number of items per page',
      PAGE_QUERY_NAME: 'page',
      PAGE_QUERY_DESCRIPTION: 'Page number',
      KEYWORD_QUERY_NAME: 'keyword',
      KEYWORD_QUERY_DESCRIPTION: 'Keyword description',
    },
  },
  SentimentAnalysisModule: {
    MODEL_IDENTIFIER: 'MODEL_IDENTIFIER',
    ANALYSIS_TYPE: 'ANALYSIS_TYPE',
    SENTIMENT_ABUSIVE: 'Abusive',
    SENTIMENT_NEGATIVE: 'Negative',
    SENTIMENT_NEUTRAL: 'Neutral',
    SENTIMENT_POSITIVE: 'Positive',
  },
};
