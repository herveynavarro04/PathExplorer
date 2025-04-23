import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProfileRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
