import { getWithAuth } from '@enxoval/http';
import { decodeToken } from '@enxoval/auth';
import { UnauthorizedError } from '@enxoval/types';
import { getMe } from '../../controllers/me';

export function registerMeRoutes(): void {
  getWithAuth('/me', async (authorization) => {
    const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;
    if (!token) throw new UnauthorizedError('Unauthorized');

    const payload = decodeToken(token);
    if (!payload) throw new UnauthorizedError('Unauthorized');

    return getMe(payload.userId, token);
  });
}
