import { post } from '@enxoval/http';
import { LoginWireIn } from '../../wire/in/login';
import { login } from '../../controllers/auth';

export function registerAuthRoutes(): void {
  post('/auth/login', async (body) => {
    const input = LoginWireIn.parse(body);
    return login(input.email, input.password);
  });
}
