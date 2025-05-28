import { IsNotEmpty, IsString } from 'class-validator';

export class PostFeedbackRequestDto {
  @IsString()
  @IsNotEmpty()
  information: string;
}
