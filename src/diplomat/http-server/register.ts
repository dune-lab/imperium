import { post } from '@enxoval/http';
import { RegisterWireIn } from '../../wire/in/register';
import { register } from '../../controllers/register';

export function registerRegisterRoutes(): void {
  post('/users/register', async (body) => {
    const input = RegisterWireIn.parse(body);
    return register(input.name, input.email, input.password, input.role);
  });
}
