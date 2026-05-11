import { asyncFn } from '@enxoval/types';
import { LoginWireIn } from '../wire/in/login';
import { AuthToken } from '../model/auth';
import * as diplomat from '../diplomat/http-client';

export const login = asyncFn(LoginWireIn, AuthToken, (input) =>
  diplomat.login(input));
