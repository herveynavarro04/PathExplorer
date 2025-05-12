import { IsNotEmpty, IsString } from 'class-validator';

export class TechDto {
  @IsString()
  @IsNotEmpty()
  technologyId: string;

  @IsString()
  @IsNotEmpty()
  technologyName: string;
}
