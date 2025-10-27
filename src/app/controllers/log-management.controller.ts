import { Controller, Delete, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogCleanupService } from '@src/app/services/log-cleanup.service';

@ApiTags('Log Management')
@Controller('logs')
export class LogManagementController {
  constructor(private readonly logCleanupService: LogCleanupService) {}

  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get log file statistics',
    description: 'Returns statistics about log files including size, age, and retention status',
  })
  @ApiResponse({
    status: 200,
    description: 'Log statistics retrieved successfully',
  })
  async getLogStatistics(): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    const stats = await this.logCleanupService.getLogStatistics();
    return {
      success: true,
      data: stats,
      message: 'Log statistics retrieved successfully',
    };
  }

  @Post('cleanup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Manually trigger log cleanup',
    description: 'Deletes log files older than the retention period (15 days)',
  })
  @ApiResponse({
    status: 200,
    description: 'Log cleanup completed successfully',
  })
  async triggerCleanup(): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    const result = await this.logCleanupService.cleanupOldLogs();
    return {
      success: true,
      data: result,
      message: `Cleanup completed: ${result.deletedCount} files deleted, ${result.freedSpaceMB.toFixed(2)}MB freed`,
    };
  }

  @Delete('cleanup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete old logs (alias for POST /cleanup)',
    description: 'Deletes log files older than the retention period (15 days)',
  })
  @ApiResponse({
    status: 200,
    description: 'Log cleanup completed successfully',
  })
  async deleteOldLogs(): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    return this.triggerCleanup();
  }
}
