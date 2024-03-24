import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { ApiBody } from '@nestjs/swagger';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginAdminDto })
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  // @Post('registration')
  // @UsePipes(ValidationPipe)
  // async registration(@Body() registrationDto: RegistrationAdminDto) {
  //   return await this.authService.registration(registrationDto);
  // }
}
