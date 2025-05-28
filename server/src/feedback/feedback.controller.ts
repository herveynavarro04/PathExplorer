import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { PostFeedbackRequestDto } from './dto/request/postFeedback.request.dto';
import { PostFeedbackResponseDto } from './dto/response/postFeedback.response.dto';
import { Request } from 'express';
import { GetEmployeeFeedbackDtoResponse } from './dto/response/getEmployeeFeedback.response.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedBackService: FeedbackService) {}

  @Post(':employeeId')
  @UseGuards(JwtGuard)
  async postFeedback(
    @Req() req: Request,
    @Param('employeeId') employeeId: string,
    @Body() postFeedbackPayload: PostFeedbackRequestDto,
  ): Promise<PostFeedbackResponseDto> {
    const reviserId = req.user['employeeId'];
    return this.feedBackService.postFeedback(
      employeeId,
      reviserId,
      postFeedbackPayload,
    );
  }

  @Get(':employeeId')
  @UseGuards(JwtGuard)
  async getFeedback(
    @Param('employeeId') employeeId: string,
  ): Promise<GetEmployeeFeedbackDtoResponse[]> {
    return this.feedBackService.getEmployeeFeedback(employeeId);
  }
}
