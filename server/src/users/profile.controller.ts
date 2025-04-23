import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/Guards/jwt.guards';
import { Request } from 'express';
import { ProfileInfoResponseDto } from './dto/response/profileInfo.response.dto';
import { ProfileUpdateRequestDto } from './dto/request/profileUpdate.request.dto';
import { DeleteProfileResponseDto } from './dto/response/deleteProfile.response.dto';
import { DeleteProfileRequestDto } from './dto/request/profileDelete.request.dto';

@Controller('user/profile')
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @UseGuards(JwtGuard)
  async getProfile(@Req() req: Request): Promise<ProfileInfoResponseDto> {
    const userId = req.user['userId'];
    return this.usersService.getProfileInfo(userId);
  }

  @Patch('')
  @UseGuards(JwtGuard)
  async updateProfile(
    @Body() updatePayload: ProfileUpdateRequestDto,
    @Req() req: Request,
  ): Promise<ProfileInfoResponseDto> {
    const userId = req.user['userId'];
    return this.usersService.updateProfileInfo(userId, updatePayload);
  }

  @Delete('')
  @UseGuards(JwtGuard)
  async deleteProfile(
    @Body() userPayload: DeleteProfileRequestDto,
  ): Promise<DeleteProfileResponseDto> {
    return this.usersService.deleteProfile(userPayload.userId);
  }
}
