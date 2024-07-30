import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService
  ) {}

  public async registerUser(phoneNumber: string) {
    const clientId = this.configService.get('AUTH0_CLIENT_ID');
    const clientSecret = this.configService.get('AUTH0_CLIENT_SECRET');

    var options = {
      method: 'POST',
      url: `${this.configService.get('AUTH0_BASE_URL')}/passwordless/start`,
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        connection: 'sms',
        phone_number: phoneNumber,
        send: 'code'
      }
    };

    const response = await axios.request(options);
    return response.data;
  }

  public async verifyUser(phoneNumber: string, code: string): Promise<{ access_token: string, id_token: string}> {
    const clientId = this.configService.get('AUTH0_CLIENT_ID');
    const clientSecret = this.configService.get('AUTH0_CLIENT_SECRET');

    var options = {
      method: 'POST',
      url: `${this.configService.get('AUTH0_BASE_URL')}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        audience: this.configService.get('AUTH0_AUDIENCE'),
        grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
        username: phoneNumber,
        otp: code,
        realm: 'sms',
        scope: 'openid profile email offline_access',
      }
    };

    const response = await axios.request(options);

    return response.data;
  }

  public async refreshAccessToken(refreshToken: string) {
    const clientId = this.configService.get('AUTH0_CLIENT_ID');
    const clientSecret = this.configService.get('AUTH0_CLIENT_SECRET');

    var options = {
      method: 'POST',
      url: `${this.configService.get('AUTH0_BASE_URL')}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        audience: this.configService.get('AUTH0_AUDIENCE'),
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }
    };

    const response = await axios.request(options);
    return response.data;
  }
}
