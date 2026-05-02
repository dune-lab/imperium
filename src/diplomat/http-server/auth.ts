import { post } from '@enxoval/http';
import { login } from '../../controllers/auth';

export function registerAuthRoutes(): void {
  post('/auth/login', async (body) => login(body));
}
