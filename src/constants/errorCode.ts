export const errorCode = {
  INTERNAL_SERVER_ERROR: 'InternalServerError',

  FORBIDDEN: 'Forbidden',
  ACCESS_DENIED: 'AccessDenied',
  RATE_LIMIT: 'RateLimit',

  OTP_EXPIRED: 'OtpExpired',

  AUTH_FAILED: 'AuthFailed',
  TOKEN_EXPIRED: 'TokenExpired',
  REFRESH_TOKEN_EXPIRED: 'RefreshTokenExpired',
  OLD_PASSWORD_INCORRECT: 'OldPasswordInCorrect',
  NEW_PASSWORD_IS_EQUAL_OLD_PASSWORD: 'NewPasswordIsEqualOldPassword',

  USER_NOT_FOUND: 'UserNotFound',
  PHONE_EXISTED: 'PhoneExisted',
  EMAIL_EXISTED: 'EmailExisted',
};
