import { GetTokenResponse } from '@root/interfaces';
import { httpService } from '@services';

class API {
  async getRedirectUrl(domain: string, clientIp: string) {
    return httpService.post<GetTokenResponse>('/api/v1/auth/token', {
      body: {
        domain,
        clientIp,
      },
    });
  }
}

export const AuthenticationAPI = new API();
