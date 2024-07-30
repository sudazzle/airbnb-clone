import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as jsonwebtoken from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateToken(request);
  }

  private async validateToken(request) {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      try {
        const token = authHeader.split(' ')[1];
        const decodedHeader = jwtDecode(token, { header: true });
        try {
          const auth0SigningKeys = await axios.get(this.configService.get('AUTH0_BASE_URL') + '/.well-known/jwks.json');
          const accessTokenJWK = auth0SigningKeys.data.keys.find((key) => key.kid === decodedHeader.kid);
          const pem = jwkToPem(accessTokenJWK);
          const decodedToken = jsonwebtoken.verify(token, pem);
          return Boolean(decodedToken);
        } catch {
          return false;
        }
      } catch {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}


/*
curl -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InQ5aC1tbm9qTG5qdTd2WHEyTEFsNSJ9.eyJpc3MiOiJodHRwczovL2Rldi1qdTB6ajBpYy51cy5hdXRoMC5jb20vIiwic3ViIjoic21zfDY1Yjk2ZWQzMmU1NGUxYWQ4NWQ5NDBiOCIsImF1ZCI6WyJodHRwczovL215LWFpcmJuYi1jbG9uZSIsImh0dHBzOi8vZGV2LWp1MHpqMGljLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MTA5Njc1MTgsImV4cCI6MTcxMTA1MzkxOCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImd0eSI6InBhc3N3b3JkIiwiYXpwIjoiNmo1VzE1cE94UWREZXRXU0pMdlVnWWtWaENzaTZ0emQifQ.1ogs87j3llu9YB1EuvjNunfOdzi-MU-rAgA3mr9JuWG4r1df7E0OnMGvIOCV8h0w0zD-WxWTNDp7ssgOXkQ6seraDONOoOeBaRMGZozvaSH5xueYnh_tVPpRh2sW49aFPsDv5fkbE4wy8v2Jt_w37gRXcLS_lb9PxJ5s6zksU4-N3fZTTX6s8OHajcbkGJm44E04R9KWa6isReOd_8Kj_5WmPmS3R1a7dp_ZqObgNaf35nudKe1bRB5DU9_YetVwpguKRTx6Hevr-E77dimcYV9RYg8OriBQ5ePJJMGZ9f1XpVDKcUV6WRZB31DN2-Z_lJnEbGaZb5CBBmNqmFjemA" http://localhost:4000
*/