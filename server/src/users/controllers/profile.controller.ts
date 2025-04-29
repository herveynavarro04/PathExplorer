import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { Request } from 'express';
import { ProfileInfoResponseDto } from '../dto/response/profileInfo.response.dto';
import { ProfileUpdateRequestDto } from '../dto/request/profileUpdate.request.dto';
import { DeleteProfileResponseDto } from '../dto/response/deleteProfile.response.dto';
import { DeleteProfileRequestDto } from '../dto/request/profileDelete.request.dto';
import { UpdateProfileResponseDto } from '../dto/response/updateProfile.response.dto';

@Controller('user')
export class ProfileController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  async getProfile(@Req() req: Request): Promise<ProfileInfoResponseDto> {
    const userId = req.user['userId'];
    return this.userService.getProfileInfo(userId);
  }

  @Patch('profile')
  @UseGuards(JwtGuard)
  async updateProfile(
    @Body() updatePayload: ProfileUpdateRequestDto,
    @Req() req: Request,
  ): Promise<UpdateProfileResponseDto> {
    const userId = req.user['userId'];
    return this.userService.updateProfile(userId, updatePayload);
  }

  @Delete('profile')
  @UseGuards(JwtGuard)
  async deleteProfile(
    @Body() userPayload: DeleteProfileRequestDto,
  ): Promise<DeleteProfileResponseDto> {
    return this.userService.deleteProfile(userPayload.userId);
  }
}
