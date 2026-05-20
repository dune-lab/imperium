import { post } from '@enxoval/http';
import { LoginWireIn } from '../../wire/in/login';
import { AuthToken } from '../../model/auth';
import { login } from '../../controllers/auth';

export function registerAuthRoutes(): void {
  post('/auth/login', async (body) => login(body), {
    in:  { schema: LoginWireIn, name: 'LoginWireIn' },
    out: { schema: AuthToken,   name: 'AuthToken'   },
  });
}
