import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificatesEntity } from './entities/certificates.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(CertificatesEntity)
    private certificatesRepository: Repository<CertificatesEntity>,
  ) {}

  async postCertificate(employeeId: string): Promise<> {
    
  }
}
