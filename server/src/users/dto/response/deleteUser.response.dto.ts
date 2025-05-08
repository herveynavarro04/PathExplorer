import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserResponseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
