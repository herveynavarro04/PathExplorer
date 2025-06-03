import { Module } from '@nestjs/common';
import { PeopleLeadController } from './people-lead.controller';
import { PeopleLeadService } from './people-lead.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleLeadEntity } from './entity/peopleLead.entity';
import { EmployeeAssigned } from 'src/common/entities/employeeAssigned.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleLeadEntity, EmployeeAssigned])],
  controllers: [PeopleLeadController],
  providers: [PeopleLeadService],
})
export class PeopleLeadModule {}
