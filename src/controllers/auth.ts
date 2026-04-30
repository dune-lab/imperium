import type { AuthToken } from '../model/auth';
import { login as janusLogin } from '../diplomat/http-client/janus';

export async function login(email: string, password: string): Promise<AuthToken> {
  return janusLogin(email, password);
}
