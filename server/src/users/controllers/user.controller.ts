import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtGuard } from 'src/common/Guards/jwt.guards';
import { Request } from 'express';
import { UserInfoResponseDto } from '../dto/response/userInfo.response.dto';
import { UserUpdateRequestDto } from '../dto/request/userUpdate.request.dto';
import { DeleteUserRequestDto } from '../dto/request/deleteUser.request.dto';
import { DeleteUserResponseDto } from '../dto/response/deleteUser.response.dto';
import { UpdateUserResponseDto } from '../dto/response/updateUser.response.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getUser(@Req() req: Request): Promise<UserInfoResponseDto> {
    const userId = req.user['userId'];
    return this.userService.getUserInfo(userId);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async updateUser(
    @Body() updatePayload: UserUpdateRequestDto,
    @Req() req: Request,
  ): Promise<UpdateUserResponseDto> {
    const userId = req.user['userId'];
    return this.userService.updateUser(userId, updatePayload);
  }

  @Delete()
  @UseGuards(JwtGuard)
  async deleteUser(
    @Body() userPayload: DeleteUserRequestDto,
  ): Promise<DeleteUserResponseDto> {
    return this.userService.deleteUser(userPayload.userId);
  }
}
