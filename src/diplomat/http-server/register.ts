import { post } from '@enxoval/http';
import { RegisterWireIn } from '../../wire/in/register';
import { MeWireOut } from '../../wire/out/me';
import { register } from '../../controllers/register';

export function registerRegisterRoutes(): void {
  post('/users/register', async (body) => register(body), {
    in:  { schema: RegisterWireIn, name: 'RegisterWireIn' },
    out: { schema: MeWireOut,      name: 'MeWireOut'      },
  });
}
