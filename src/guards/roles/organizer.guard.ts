import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from 'src/routes/auth/auth.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class OrganizerGuard implements CanActivate {
  /**
   * Runs the built in canActivate function to determine if the request would be processed or not
   * @param authService -Instance of the auth service to access the decrypt functtion
   * @param context
   * @returns
   */
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    // Check if we have proper HTTP context

    const request = ctx.req;
    const response = ctx.res;
    const sessionToken = await request.cookies['sessionToken'];

    if (!sessionToken) {
      console.log(`No session token found`);
      return false;
    }
    const payload = await this.executeDecryption(sessionToken);
    const { role } = payload;
    if (!role) return false;
    if (role !== 'Organizer') {
      if (role === 'Admin') return true;
      return false;
    }
    return true;
  }

  async executeDecryption(token: string) {
    /**
     * Decrypts the session token using the underlying logic from auth service
     * @param token -User session token
     * @returns -Returns the decrypted payload
     */
    const decryptedSession = await this.authService.decrypt(token);
    return decryptedSession.payload;
  }
}
