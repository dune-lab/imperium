import { post } from '@enxoval/http';
import { register } from '../../controllers/register';

export function registerRegisterRoutes(): void {
  post('/users/register', async (body) => register(body));
}
