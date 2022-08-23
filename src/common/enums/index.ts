export enum ERole {
  USER = 1,
  ADMIN = 2,
}

export enum EVip {
  VIP_0 = 0,
  VIP_1 = 1,
  VIP_2 = 3,
  VIP_3 = 6,
}

export const vipAmount = {
  1: '99.000',
  3: '199.000',
  6: '399.000',
};

export enum EReleaseStatus {
  RELEASING = 1,
  RELEASED = 2,
}

export enum ECensorshipStatus {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export enum EGender {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

export enum ESortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ESortBy {
  LIKE = 1,
  VIEW = 2,
  UPDATE_TIME = 3,
}

export enum ECTransactionStatus {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export enum LogLevel {
  Emerg = 'emerg',
  Alert = 'alert',
  Crit = 'crit',
  Error = 'error',
  Warning = 'warning',
  Notice = 'notice',
  Info = 'info',
  Debug = 'debug',
}
