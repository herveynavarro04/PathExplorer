import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateChargeabilityResponseDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
