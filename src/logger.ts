import { Injectable, LoggerService, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import pino from 'pino';
import { ENV } from './env';

interface ILoggerConfig {
  fileRotation?: {
    maxSize?: string;
    maxFiles?: number;
    frequency?: 'daily' | 'hourly';
    retentionDays?: number; // Auto-delete logs older than this
  };
  logLevel?: string;
}

// Singleton to manage logger instances and prevent port conflicts
class LoggerManager {
  private static instance: LoggerManager;
  private loggers: Map<string, pino.Logger> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): LoggerManager {
    if (!LoggerManager.instance) {
      LoggerManager.instance = new LoggerManager();
    }
    return LoggerManager.instance;
  }

  createLogger(config: ILoggerConfig, name = 'default'): pino.Logger {
    if (this.loggers.has(name)) {
      return this.loggers.get(name)!;
    }

    const logger = this.buildLogger(config);
    this.loggers.set(name, logger);
    return logger;
  }

  clearLoggers(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.loggers.clear();
  }

  getActiveLoggersCount(): number {
    return this.loggers.size;
  }

  /**
   * Schedule automatic cleanup of old log files
   * @param logFolder - Directory containing log files
   * @param retentionDays - Number of days to keep logs
   */
  private scheduleLogCleanup(logFolder: string, retentionDays: number): void {
    // Run cleanup once on initialization
    this.cleanupOldLogs(logFolder, retentionDays);

    // Schedule cleanup to run daily at 2 AM (or every 24 hours)
    if (!this.cleanupInterval) {
      this.cleanupInterval = setInterval(
        () => {
          this.cleanupOldLogs(logFolder, retentionDays);
        },
        24 * 60 * 60 * 1000
      ); // Run every 24 hours
    }
  }

  /**
   * Delete log files older than retention period
   * @param logFolder - Directory containing log files
   * @param retentionDays - Number of days to keep logs
   */
  private cleanupOldLogs(logFolder: string, retentionDays: number): void {
    try {
      if (!fs.existsSync(logFolder)) {
        return;
      }

      const now = Date.now();
      const retentionMs = retentionDays * 24 * 60 * 60 * 1000;
      const files = fs.readdirSync(logFolder);

      let deletedCount = 0;
      let deletedSize = 0;

      files.forEach((file) => {
        const filePath = path.join(logFolder, file);
        const stats = fs.statSync(filePath);

        // Only process files (not directories)
        if (stats.isFile() && file.endsWith('.log')) {
          const fileAge = now - stats.mtime.getTime();

          if (fileAge > retentionMs) {
            try {
              deletedSize += stats.size;
              fs.unlinkSync(filePath);
              deletedCount++;
              console.info(
                `[Log Cleanup] Deleted old log file: ${file} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`
              );
            } catch (error) {
              console.error(`[Log Cleanup] Failed to delete ${file}:`, error);
            }
          }
        }
      });

      if (deletedCount > 0) {
        console.info(
          `[Log Cleanup] Cleanup completed: ${deletedCount} files deleted, ${(deletedSize / 1024 / 1024).toFixed(2)}MB freed`
        );
      }
    } catch (error) {
      console.error('[Log Cleanup] Error during log cleanup:', error);
    }
  }

  private buildLogger(config: ILoggerConfig): pino.Logger {
    const {
      fileRotation = {
        maxSize: '100m',
        maxFiles: 15, // Keep 15 days of logs
        frequency: 'daily',
        retentionDays: 15,
      },
      logLevel = ENV.config?.nodeEnv === 'production' ? 'info' : 'debug',
    } = config;

    const logFolder = ENV.logFolder || './logs';
    const isDevelopment = ENV.config?.isDevelopment || ENV.config?.nodeEnv !== 'production';

    // Schedule log cleanup on initialization
    this.scheduleLogCleanup(logFolder, fileRotation.retentionDays || 15);

    const targets: any[] = [];

    // Console transport (only in development)
    if (isDevelopment) {
      targets.push({
        target: 'pino-pretty',
        level: logLevel,
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname,service,env',
          messageFormat: '[{context}] {msg}',
          levelFirst: true,
          singleLine: true,
        },
      });
    }

    // File transports with rotation
    targets.push(
      {
        target: 'pino-roll',
        level: logLevel,
        options: {
          file: `${logFolder}/app`,
          frequency: fileRotation.frequency || 'daily',
          size: fileRotation.maxSize,
          mkdir: true,
          extension: '.log',
        },
      },
      {
        target: 'pino-roll',
        level: 'error',
        options: {
          file: `${logFolder}/error`,
          frequency: fileRotation.frequency || 'daily',
          size: fileRotation.maxSize,
          mkdir: true,
          extension: '.log',
        },
      }
    );

    return pino({
      level: logLevel,
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        log: (object: any) => {
          const { context, ...rest } = object;
          return {
            ...rest,
            ...(context && { context }),
          };
        },
      },
      serializers: {
        err: pino.stdSerializers.err,
        error: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
      },
      transport: {
        targets,
      },
      base: {
        service: ENV.serviceName || 'centinel-api',
        env: ENV.config?.nodeEnv || 'development',
        pid: process.pid,
      },
    });
  }
}

// Enhanced LoggerService interface
export interface IExtendedLoggerService extends LoggerService {
  setLogLevel: (level: string) => void;
  logWithMetadata: (
    level: string,
    message: string,
    metadata: Record<string, any>,
    context?: string
  ) => void;
  logPerformance: (
    operation: string,
    duration: number,
    context?: string,
    metadata?: Record<string, any>
  ) => void;
  flush: () => Promise<void>;
  isReady: () => boolean;
}

// Injectable Logger Service with proper lifecycle management
@Injectable()
export class EnhancedLoggerService
  implements IExtendedLoggerService, OnModuleInit, OnModuleDestroy
{
  private logger: pino.Logger;
  private loggerManager: LoggerManager;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  constructor(private config: ILoggerConfig = {}) {
    this.loggerManager = LoggerManager.getInstance();
  }

  async onModuleInit(): Promise<void> {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.initialize();
    return this.initializationPromise;
  }

  async onModuleDestroy(): Promise<void> {
    if (this.isInitialized) {
      await this.flush();
      this.isInitialized = false;
      this.loggerManager.clearLoggers();
    }
  }

  async log(message: any, context?: string): Promise<void> {
    await this.ensureInitialized();
    const childLogger = this.createChildLogger(context);

    if (typeof message === 'string') {
      childLogger.info(message);
    } else {
      childLogger.info(message, 'Log');
    }
  }

  async error(message: any, trace?: string, context?: string): Promise<void> {
    await this.ensureInitialized();
    const childLogger = this.createChildLogger(context);

    if (message instanceof Error) {
      childLogger.error(
        {
          err: message,
          stack: message.stack,
          trace,
        },
        message.message
      );
    } else if (typeof message === 'string') {
      childLogger.error(
        {
          trace,
          stack: trace,
        },
        message
      );
    } else {
      childLogger.error(
        {
          trace,
          ...message,
        },
        'Error occurred'
      );
    }
  }

  async warn(message: any, context?: string): Promise<void> {
    await this.ensureInitialized();
    const childLogger = this.createChildLogger(context);

    if (typeof message === 'string') {
      childLogger.warn(message);
    } else {
      childLogger.warn(message, 'Warning');
    }
  }

  async debug(message: any, context?: string): Promise<void> {
    await this.ensureInitialized();
    const childLogger = this.createChildLogger(context);

    if (typeof message === 'string') {
      childLogger.debug(message);
    } else {
      childLogger.debug(message, 'Debug');
    }
  }

  async verbose(message: any, context?: string): Promise<void> {
    await this.ensureInitialized();
    const childLogger = this.createChildLogger(context);

    if (typeof message === 'string') {
      childLogger.trace(message);
    } else {
      childLogger.trace(message, 'Verbose');
    }
  }

  setLogLevel(level: string): void {
    if (this.isInitialized) {
      this.logger.level = level;
    }
  }

  async logWithMetadata(
    level: string,
    message: string,
    metadata: Record<string, any>,
    context?: string
  ): Promise<void> {
    await this.ensureInitialized();
    const childLogger = this.createChildLogger(context);
    (childLogger as any)[level]({ ...metadata }, message);
  }

  async logPerformance(
    operation: string,
    duration: number,
    context?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.ensureInitialized();
    const childLogger = this.createChildLogger(context);
    childLogger.info(
      {
        operation,
        duration,
        performance: true,
        ...metadata,
      },
      `Operation ${operation} completed in ${duration}ms`
    );
  }

  async flush(): Promise<void> {
    if (this.isInitialized) {
      return new Promise<void>((resolve) => {
        this.logger.flush(() => resolve());
      });
    }
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  clearLoggers(): void {
    this.loggerManager.clearLoggers();
  }

  private async initialize(): Promise<void> {
    try {
      this.logger = this.loggerManager.createLogger(
        this.getEffectiveConfig(),
        `${ENV.serviceName}-${Date.now()}`
      );
      this.isInitialized = true;
      this.logger.info('Logger service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize logger:', error);
      throw error;
    }
  }

  private getEffectiveConfig(): ILoggerConfig {
    const isDevelopment = ENV.config?.isDevelopment || ENV.config?.nodeEnv !== 'production';
    const isProduction = !isDevelopment;

    return {
      fileRotation: {
        maxSize: isProduction ? '100m' : '50m',
        maxFiles: 15,
        frequency: 'daily',
        retentionDays: 15, // Auto-delete logs older than 15 days
      },
      logLevel: isProduction ? 'info' : 'debug',
      ...this.config,
    };
  }

  private createChildLogger(context?: string): pino.Logger {
    if (!this.isInitialized) {
      throw new Error('Logger service not initialized. Call onModuleInit() first.');
    }
    return context ? this.logger.child({ context }) : this.logger;
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized && !this.initializationPromise) {
      await this.onModuleInit();
    } else if (this.initializationPromise) {
      await this.initializationPromise;
    }
  }
}

// Factory functions for backward compatibility
export function createLogger(): IExtendedLoggerService {
  return new EnhancedLoggerService();
}

export function createCustomLogger(config: ILoggerConfig = {}): IExtendedLoggerService {
  return new EnhancedLoggerService(config);
}

export function createProductionLogger(): IExtendedLoggerService {
  return new EnhancedLoggerService({
    fileRotation: {
      maxSize: '100m',
      maxFiles: 15,
      frequency: 'daily',
      retentionDays: 15, // Auto-delete logs older than 15 days
    },
    logLevel: 'info',
  });
}

// Enhanced Performance logging decorator
export function LogPerformance(operation?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const operationName = operation || `${target.constructor.name}.${propertyKey}`;

    descriptor.value = async function (...args: any[]) {
      const start = Date.now();
      const logger = this.logger || global.logger;

      try {
        const result = await originalMethod.apply(this, args);
        const duration = Date.now() - start;

        if (logger && typeof logger.logPerformance === 'function') {
          await logger.logPerformance(operationName, duration, target.constructor.name);
        }

        return result;
      } catch (error) {
        const duration = Date.now() - start;

        if (logger && typeof logger.logPerformance === 'function') {
          await logger.logPerformance(operationName, duration, target.constructor.name, {
            error: true,
            errorMessage: error instanceof Error ? error.message : String(error),
          });
        }

        throw error;
      }
    };

    return descriptor;
  };
}

// Health check function for monitoring
export function createLoggerHealthCheck(): {
  checkHealth: () => Promise<{ status: string; details: Record<string, any> }>;
} {
  return {
    checkHealth: async (): Promise<{ status: string; details: Record<string, any> }> => {
      const loggerManager = LoggerManager.getInstance();

      return {
        status: 'ok',
        details: {
          activeLoggers: loggerManager.getActiveLoggersCount(),
          pid: process.pid,
          uptime: process.uptime(),
        },
      };
    },
  };
}
