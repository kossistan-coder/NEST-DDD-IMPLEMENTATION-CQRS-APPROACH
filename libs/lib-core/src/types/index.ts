export enum AppEnvironment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export enum AppScope {
  Api = 'api',
  FrontApi = 'front_api',
  PaymentGateway = 'payment_gateway',
}

export enum AppMailerClient {
  Mailtrap = 'mailtrap',
  Mailhog = 'mailhog',
  Sendgrid = 'sendgrid',
}

export type AppLogLevel = 'info' | 'warn' | 'error';

export type AppLogger = { log: AppLogFunc };

export type AppLogFunc = (level: AppLogLevel, message: string, data?: Record<string, any>) => void;

// File Management Enums
export enum Platform {
  PUBLIC_PLATFORM = 'PUBLIC_PLATFORM',
  PRIVATE_PLATFORM = 'PRIVATE_PLATFORM',
}

export enum FileManagerInstance {
  SHARED_INSTANCE = 'SHARED_INSTANCE',
  PRIVATE_INSTANCE = 'PRIVATE_INSTANCE',
}

export enum StorageProvider {
  MINIO = 'minio',
  S3 = 's3',
  CONTABO = 'contabo',
  LOCAL = 'local',
}

export enum SyncStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
