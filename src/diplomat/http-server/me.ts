import { get } from '@enxoval/http';
import { MeWireOut } from '../../wire/out/me';
import { getMe } from '../../controllers/me';

export function registerMeRoutes(): void {
  get('/me', async () => getMe({}), {
    in:  null,
    out: { schema: MeWireOut, name: 'MeWireOut' },
  });
}
