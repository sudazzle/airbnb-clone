import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AxiosExceptionFilter } from 'src/exception-filters/axiosErrorFilter';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService    
  ) {}

  @Post('get-otp')
  @UseFilters(AxiosExceptionFilter)
  async getOtp(
    @Body('phoneNumber') phoneNumber: string
  ) {
    return this.authService.registerUser(phoneNumber);
  }

  @Post('verify-otp')
  @UseFilters(AxiosExceptionFilter)
  async verifyOtp(
    @Body('phoneNumber') phoneNumber: string,
    @Body('code') code: string
  ) {
    return this.authService.verifyUser(phoneNumber, code);
  }
}
