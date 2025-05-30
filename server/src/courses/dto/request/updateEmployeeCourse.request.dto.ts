import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeCourseRequestDto {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
