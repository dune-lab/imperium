import { asyncFn } from '@enxoval/types';
import { LoginWireIn } from '../wire/in/login';
import { AuthToken } from '../model/auth';
import { login as janusLogin } from '../diplomat/http-client/janus';

export const login = asyncFn(LoginWireIn, AuthToken, async (input) => {
  return janusLogin({ email: input.email, password: input.password });
});
