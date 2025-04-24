import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { Request } from 'express';
import { ProfileInfoResponseDto } from '../dto/response/profileInfo.response.dto';
import { ProfileUpdateRequestDto } from '../dto/request/profileUpdate.request.dto';
import { DeleteProfileResponseDto } from '../dto/response/deleteProfile.response.dto';
import { DeleteProfileRequestDto } from '../dto/request/profileDelete.request.dto';
import { UpdateProfileResponseDto } from '../dto/response/updateProfile.response.dto';

@Controller('user/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getProfile(@Req() req: Request): Promise<ProfileInfoResponseDto> {
    const userId = req.user['userId'];
    return this.profileService.getProfileInfo(userId);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async updateProfile(
    @Body() updatePayload: ProfileUpdateRequestDto,
    @Req() req: Request,
  ): Promise<UpdateProfileResponseDto> {
    const userId = req.user['userId'];
    return this.profileService.updateProfile(userId, updatePayload);
  }

  @Delete()
  @UseGuards(JwtGuard)
  async deleteProfile(
    @Body() userPayload: DeleteProfileRequestDto,
  ): Promise<DeleteProfileResponseDto> {
    return this.profileService.deleteProfile(userPayload.userId);
  }
}
