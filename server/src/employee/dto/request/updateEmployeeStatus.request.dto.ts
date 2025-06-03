import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeStatusRequestDto {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
