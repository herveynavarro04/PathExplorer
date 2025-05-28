import { IsNotEmpty, IsString } from 'class-validator';

export class PostFeedbackResponseDto {
  @IsString()
  @IsNotEmpty()
  feedbackId: string;
}
