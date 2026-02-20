import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Auth } from '@src/app/decorators';
import { AuthType } from '@src/app/enums/auth-type.enum';
import { IFileMeta } from '@src/app/interfaces';
import { SuccessResponse } from '@src/app/types';
import { storageImageOptions } from '@src/shared/file.constants';
import { FilterFiledDTO } from '../dtos';
import { UploadFileDto } from '../dtos/fileStorage/uploadFile.dto';
import { FileUploadService } from '../services/fileUpload.service';

@ApiTags('File Storage')
// @ApiBearerAuth()
@Auth(AuthType.None)
@Controller('internal/files')
export class FileStorageController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Get()
  async filterFiles(@Query() query: FilterFiledDTO): Promise<any> {
    return this.fileUploadService.filterFiles(query);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FilesInterceptor('files', 5, { storage: storageImageOptions }))
  async uploadImage(
    @UploadedFiles() files: IFileMeta[],
    @Body() body: UploadFileDto
  ): Promise<SuccessResponse> {
    return this.fileUploadService.uploadImage(files, body);
  }

  @Auth(AuthType.None)
  @Delete('bulk')
  async deleteMany(): Promise<SuccessResponse> {
    return this.fileUploadService.deleteFiles();
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<SuccessResponse> {
    return this.fileUploadService.deleteFile(id);
  }
}
