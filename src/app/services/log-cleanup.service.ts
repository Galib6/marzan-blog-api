import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ENV } from '@src/env';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogCleanupService {
  private readonly logger = new Logger(LogCleanupService.name);
  private readonly logFolder: string;
  private readonly retentionDays: number;

  constructor() {
    this.logFolder = ENV.logFolder || './logs';
    this.retentionDays = 15; // Keep logs for 15 days
  }

  /**
   * Run log cleanup daily at 2:00 AM
   * This removes log files older than the retention period
   */
  @Cron(CronExpression.EVERY_DAY_AT_2AM, {
    name: 'log-cleanup',
    timeZone: ENV.config.timeZone || 'UTC',
  })
  async handleLogCleanup(): Promise<void> {
    this.logger.log('Starting scheduled log cleanup...');

    try {
      const result = await this.cleanupOldLogs();
      this.logger.log(
        `Log cleanup completed: ${result.deletedCount} files deleted, ${result.freedSpaceMB.toFixed(2)}MB freed`
      );
    } catch (error) {
      this.logger.error('Error during scheduled log cleanup', error);
    }
  }

  /**
   * Manually trigger log cleanup
   * Can be called via API endpoint for manual cleanup
   */
  async cleanupOldLogs(): Promise<{
    deletedCount: number;
    freedSpaceMB: number;
    deletedFiles: string[];
  }> {
    const result = {
      deletedCount: 0,
      freedSpaceMB: 0,
      deletedFiles: [] as string[],
    };

    try {
      // Ensure log folder exists
      if (!fs.existsSync(this.logFolder)) {
        this.logger.warn(`Log folder does not exist: ${this.logFolder}`);
        return result;
      }

      const now = Date.now();
      const retentionMs = this.retentionDays * 24 * 60 * 60 * 1000;
      const files = fs.readdirSync(this.logFolder);

      for (const file of files) {
        try {
          const filePath = path.join(this.logFolder, file);
          const stats = fs.statSync(filePath);

          // Only process log files (not directories)
          if (stats.isFile() && (file.endsWith('.log') || file.match(/\.\d+\.log$/))) {
            const fileAge = now - stats.mtime.getTime();

            if (fileAge > retentionMs) {
              const sizeMB = stats.size / (1024 * 1024);
              fs.unlinkSync(filePath);

              result.deletedCount++;
              result.freedSpaceMB += sizeMB;
              result.deletedFiles.push(file);

              this.logger.debug(
                `Deleted old log file: ${file} (${sizeMB.toFixed(2)}MB, age: ${Math.floor(fileAge / (24 * 60 * 60 * 1000))} days)`
              );
            }
          }
        } catch (fileError) {
          this.logger.error(`Failed to process file ${file}:`, fileError);
        }
      }

      return result;
    } catch (error) {
      this.logger.error('Error during log cleanup:', error);
      throw error;
    }
  }

  /**
   * Get statistics about log files
   */
  async getLogStatistics(): Promise<{
    totalFiles: number;
    totalSizeMB: number;
    oldestFile: string | null;
    oldestFileAgeDays: number;
    files: Array<{
      name: string;
      sizeMB: number;
      ageDays: number;
      willBeDeleted: boolean;
    }>;
  }> {
    const stats = {
      totalFiles: 0,
      totalSizeMB: 0,
      oldestFile: null as string | null,
      oldestFileAgeDays: 0,
      files: [] as Array<{
        name: string;
        sizeMB: number;
        ageDays: number;
        willBeDeleted: boolean;
      }>,
    };

    try {
      if (!fs.existsSync(this.logFolder)) {
        return stats;
      }

      const now = Date.now();
      const retentionMs = this.retentionDays * 24 * 60 * 60 * 1000;
      const files = fs.readdirSync(this.logFolder);

      for (const file of files) {
        try {
          const filePath = path.join(this.logFolder, file);
          const fileStats = fs.statSync(filePath);

          if (fileStats.isFile() && (file.endsWith('.log') || file.match(/\.\d+\.log$/))) {
            const fileAge = now - fileStats.mtime.getTime();
            const ageDays = Math.floor(fileAge / (24 * 60 * 60 * 1000));
            const sizeMB = fileStats.size / (1024 * 1024);

            stats.totalFiles++;
            stats.totalSizeMB += sizeMB;

            stats.files.push({
              name: file,
              sizeMB: parseFloat(sizeMB.toFixed(2)),
              ageDays,
              willBeDeleted: fileAge > retentionMs,
            });

            if (ageDays > stats.oldestFileAgeDays) {
              stats.oldestFileAgeDays = ageDays;
              stats.oldestFile = file;
            }
          }
        } catch (fileError) {
          this.logger.error(`Failed to get stats for file ${file}:`, fileError);
        }
      }

      stats.totalSizeMB = parseFloat(stats.totalSizeMB.toFixed(2));
      stats.files.sort((a, b) => b.ageDays - a.ageDays);

      return stats;
    } catch (error) {
      this.logger.error('Error getting log statistics:', error);
      throw error;
    }
  }

  /**
   * Archive old logs to a compressed file before deletion
   * Useful for compliance or audit requirements
   */
  async archiveOldLogs(
    _archivePath?: string
  ): Promise<{ archivedCount: number; archiveFile: string }> {
    // This is a placeholder for future implementation
    // You can use tar or zip to archive logs before deletion
    this.logger.warn('Archive functionality not yet implemented');
    return { archivedCount: 0, archiveFile: '' };
  }
}
