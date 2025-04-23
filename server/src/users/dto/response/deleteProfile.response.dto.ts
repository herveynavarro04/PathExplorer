import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProfileResponseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
