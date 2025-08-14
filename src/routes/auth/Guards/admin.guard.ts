
import { AuthService } from '../auth.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  /**
   * Runs the built in canActivate function to determine if the request would be processed or not
   * @param authService -Instance of the auth service to access the decrypt functtion
   */
  constructor (private readonly authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const sessionToken = request.cookies['sessionToken']
    const payload = await this.executeDecryption(sessionToken)
    const {role} = payload
    if (!role) return false
    if (role !== 'Admin') return false
    return true;
  }
  
  async executeDecryption(token:string) {
    /**
     * Decrypts the session token using the underlying logic from auth service
     * @param token -User session token
     * @returns -Returns the decrypted payload
     */
    const decryptedSession = await this.authService.decrypt(token);
    return decryptedSession.payload
  }
}
