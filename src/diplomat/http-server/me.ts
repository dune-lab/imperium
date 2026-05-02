import { get } from '@enxoval/http';
import { getMe } from '../../controllers/me';

export function registerMeRoutes(): void {
  get('/me', async () => getMe({}));
}
