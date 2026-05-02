import { asyncFn } from '@enxoval/types';
import { RegisterWireIn } from '../wire/in/register';
import { UserData } from '../model/me';
import { createUser } from '../diplomat/http-client/atreides';

export const register = asyncFn(RegisterWireIn, UserData, async (input) => {
  return createUser({ name: input.name, email: input.email, password: input.password, role: input.role });
});
