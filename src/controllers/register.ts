import type { UserData } from '../model/me';
import { createUser } from '../diplomat/http-client/atreides';

export async function register(
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<UserData> {
  return createUser(name, email, password, role);
}
