import { asyncFn } from '@enxoval/types';
import { LoginWireIn } from '../wire/in/login';
import { AuthToken } from '../model/auth';
import { login } from '../diplomat/http-client';

export const login = asyncFn(LoginWireIn, AuthToken, async (input) => {
  return login({ email: input.email, password: input.password });
});
