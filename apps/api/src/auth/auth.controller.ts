import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
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
