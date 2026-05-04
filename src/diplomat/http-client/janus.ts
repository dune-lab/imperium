import { asyncFn, createSchema, field, UnauthorizedError } from '@enxoval/types';
import { AuthToken } from '../../model/auth';

const LoginInput = createSchema({
  email: field.string(),
  password: field.string(),
});

export const login = asyncFn(LoginInput, AuthToken, async (input) => {
  const res = await fetch(`${process.env.JANUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: input.email, password: input.password }),
  });
  if (res.status === 401) throw new UnauthorizedError('E-mail ou senha inválidos');
  if (!res.ok) throw new Error(`janus returned ${res.status}`);
  return AuthToken.parse(await res.json());
});
