import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { ApiTags, ApiBody, ApiResponse } from "@nestjs/swagger";
import { LoginDto } from "src/auth/dto/login.dto";
import { Token } from "./auth/interfaces/token.interface";

@ApiTags("User")
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  @ApiBody({ type: [LoginDto] })
  @ApiResponse({ type: Token })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
