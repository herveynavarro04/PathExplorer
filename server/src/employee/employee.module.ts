import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeInterestEntity } from 'src/common/entities/employeeInterests.entity';
import { HashingService } from 'src/Utilities/hashing.utilities';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeeProjectEntity } from 'src/common/entities/employeeProject.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeProfilePicture } from './entities/employeeProfilePicture.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      EmployeeProjectEntity,
      EmployeeInterestEntity,
      EmployeeProfilePicture,
    ]),
  ],
  providers: [EmployeeService, HashingService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
