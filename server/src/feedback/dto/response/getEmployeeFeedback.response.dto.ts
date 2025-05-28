import { IsNotEmpty, IsString } from 'class-validator';

export class GetEmployeeFeedbackDtoResponse {
  @IsString()
  @IsNotEmpty()
  feedbackId: string;

  @IsString()
  @IsNotEmpty()
  reviserFirstName: string;

  @IsString()
  @IsNotEmpty()
  reviserLastName: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsString()
  @IsNotEmpty()
  createdAt: Date;
}
