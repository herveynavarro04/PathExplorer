import { IsNotEmpty, IsString } from 'class-validator';

export class TechDto {
  @IsString()
  @IsNotEmpty()
  techId: string;

  @IsString()
  @IsNotEmpty()
  techName: string;
}
