import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { PostCertificateRequestDto } from './dto/request/postCertificate.request.dto';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { GetCertificateByIdResponseDto } from './dto/response/getCertificateById.response.dto';
import { GetCertificatesResponseDto } from './dto/response/getCertificates.response.dto';
import { DeleteCertificateResponseDto } from './dto/response/deleteCertificate.response.dto';
import { UpdateCertificateStatusRequestDto } from './dto/request/updatePayload.request.dto';
import { UpdateCertificateResponseDto } from './dto/response/updateCertificate.response.dto';

@Controller('certificates')
export class CertificatesController {
  constructor(private certificateService: CertificatesService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('certificateFile'))
  async postCertificate(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() postCertificatePayload: PostCertificateRequestDto,
  ) {
    const employeeId = req.user['employeeId'];
    return this.certificateService.postCertificate(
      employeeId,
      postCertificatePayload,
      file,
    );
  }

  @Patch(':certificateId')
  @UseGuards(JwtGuard)
  async updateCertificateStatus(
    @Param('certificateId') certificateId: string,
    @Body() updatePayload: UpdateCertificateStatusRequestDto,
  ): Promise<UpdateCertificateResponseDto> {
    return this.certificateService.updateCertificateStatus(
      certificateId,
      updatePayload,
    );
  }

  @Get()
  @UseGuards(JwtGuard)
  async getCertificates(
    @Req() req: Request,
  ): Promise<GetCertificatesResponseDto> {
    const employeeId = req.user['employeeId'];
    return this.certificateService.getCertificates(employeeId);
  }

  @Get(':employeeId')
  @UseGuards(JwtGuard)
  async getCertificatesByEmployeeId(
    @Param('employeeId') employeeId: string,
  ): Promise<GetCertificatesResponseDto> {
    return this.certificateService.getCertificates(employeeId);
  }

  @Delete(':certificateId')
  @UseGuards(JwtGuard)
  async delete(
    @Param('certificateId') certificateId: string,
  ): Promise<DeleteCertificateResponseDto> {
    return this.certificateService.deleteCertificate(certificateId);
  }

  @Get(':certificateId')
  @UseGuards(JwtGuard)
  async getCertificateById(
    @Param('certificateId') certificateId: string,
  ): Promise<GetCertificateByIdResponseDto> {
    return this.certificateService.getCertificateById(certificateId);
  }

  @Get(':certificateId/file')
  @UseGuards(JwtGuard)
  async getCertificateFileById(
    @Param('certificateId') certificateId: string,
    @Res() res: Response,
  ): Promise<void> {
    const certificate =
      await this.certificateService.getCertificateFileById(certificateId);

    res.setHeader(
      'Content-Type',
      certificate.mimeType || 'application/octet-stream',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${certificate.fileTitle || 'certificate'}.pdf"`,
    );
    res.end(certificate.fileData);
  }
}
