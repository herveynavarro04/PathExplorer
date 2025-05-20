import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificatesEntity } from './entities/certificates.entity';
import { PostCertificateRequestDto } from './dto/request/postCertificate.request.dto';
import { PostCertificateResponseDto } from './dto/response/postCertificate.response.dto';
import { v4 as uuidv4 } from 'uuid';
import { CertificatesFilesEntity } from './entities/certificatesFiles.entity';
import { GetCertificateByIdResponseDto } from './dto/response/getCertificateById.response.dto';
import { GetCertificatesResponseDto } from './dto/response/getCertificates.response.dto';
import { DeleteCertificateResponseDto } from './dto/response/deleteCertificate.response.dto';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(CertificatesEntity)
    private certificatesRepository: Repository<CertificatesEntity>,

    @InjectRepository(CertificatesFilesEntity)
    private certificatesFilesRepository: Repository<CertificatesFilesEntity>,
  ) {}

  async postCertificate(
    employeeId: string,
    postCertificatePayload: PostCertificateRequestDto,
    file: Express.Multer.File,
  ): Promise<PostCertificateResponseDto> {
    try {
      const certificateId = uuidv4();
      const newCertificate: CertificatesEntity = {
        certificateId: certificateId,
        title: postCertificatePayload.title,
        information: postCertificatePayload.information,
        obtainedAt: postCertificatePayload.obtainedAt,
        employeeId: employeeId,
        createdAt: new Date(),
        status: 'pending',
      };
      await this.certificatesRepository.save(newCertificate);
      await this.saveCertificateFile(certificateId, file);
      Logger.log('Certificate created succesfully', 'CertificatesService');
      return {
        certificateId: certificateId,
        createdAt: new Date(),
      };
    } catch (error) {
      Logger.error(
        'Error during certificate registration',
        error.stack,
        'CertificateService',
      );
      throw new InternalServerErrorException('Failed to create certificate');
    }
  }

  async deleteCertificate(
    certificateId: string,
  ): Promise<DeleteCertificateResponseDto> {
    try {
      await this.certificatesRepository.delete({
        certificateId: certificateId,
      });
      Logger.log('Certificate succesfully deleted', 'CertificatesService');
      return {
        certificateId: certificateId,
      };
    } catch (error) {
      Logger.error(
        'Error during certificate delition',
        error.stack,
        'CertificateService',
      );
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  async saveCertificateFile(
    certificateId: string,
    file: Express.Multer.File,
  ): Promise<void> {
    try {
      console.log(file.filename);
      const newFile: CertificatesFilesEntity = {
        certificateId: certificateId,
        fileTitle: `${certificateId}.${file.mimetype?.split('/')[1]}`,
        fileData: file.buffer,
        mimeType: file.mimetype,
      };
      await this.certificatesFilesRepository.save(newFile);
      Logger.log('Certificate file saved succesfully', 'CertificatesService');
    } catch (error) {
      Logger.error(
        'Error during file registration',
        error.stack,
        'CertificateService',
      );
      throw new InternalServerErrorException('Failed to save file');
    }
  }

  async getCertificates(
    employeeId: string,
  ): Promise<GetCertificatesResponseDto> {
    try {
      const employeeCertificates = await this.certificatesRepository.find({
        where: { employeeId: employeeId },
        select: [
          'certificateId',
          'createdAt',
          'status',
          'title',
          'information',
        ],
      });
      Logger.log(
        'Certificates info succesfully fetched',
        'CertificatesService',
      );
      const certificates = employeeCertificates.map((certificate) => ({
        certificateId: certificate.certificateId,
        title: certificate.title,
        obtainedAt: certificate.obtainedAt,
        information: certificate.information,
        status: certificate.status,
      }));
      return {
        certificates: certificates,
      };
    } catch (error) {
      Logger.error(
        'Error during certificates info fetching',
        error.stack,
        'CertificateService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch certificates info',
      );
    }
  }

  async getCertificateById(
    certificateId: string,
  ): Promise<GetCertificateByIdResponseDto> {
    try {
      const certificateInfo = await this.certificatesRepository.findOne({
        where: { certificateId: certificateId },
        select: ['status', 'title', 'obtainedAt'],
      });
      Logger.log('Certificate info succesfully fetched', 'CertificatesService');
      return certificateInfo;
    } catch (error) {
      Logger.error(
        'Error during certificate info fetching',
        error.stack,
        'CertificateService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch certificate info',
      );
    }
  }

  async getCertificateFileById(certificateId: string): Promise<any> {
    try {
      const certificateFile = await this.certificatesFilesRepository.findOne({
        where: { certificateId: certificateId },
        select: ['fileData', 'mimeType', 'fileTitle'],
      });
      Logger.log('Certificate file succesfully fetched', 'CertificatesService');
      return certificateFile;
    } catch (error) {
      Logger.error(
        'Error during certificate file fetching',
        error.stack,
        'CertificateService',
      );
      throw new InternalServerErrorException(
        'Failed to fetch certificate file',
      );
    }
  }
}
