import { Controller, Request, Post, UseGuards, Get, Header, Param, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/login.dto';
import { Token } from './auth/interfaces/token.interface';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('User')
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiBody({ type: [LoginDto] })
  @ApiResponse({ type: Token })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiTags('Media')
  @Get('images/:image_id')
  @Header('Content-Type', 'image/jpeg')
  @ApiResponse({ description: 'An image in jpg format.'})
  async getImage(@Param('image_id') id: string, @Res() res) {
    return res.sendFile(id, { root: 'upload' });
  }
}
