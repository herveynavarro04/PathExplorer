import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificatesEntity } from './entities/certificates.entity';
import { CertificatesFilesEntity } from './entities/certificatesFiles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CertificatesEntity, CertificatesFilesEntity]),
  ],
  providers: [CertificatesService],
  controllers: [CertificatesController],
})
export class CertificatesModule {}
