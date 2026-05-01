import { get } from '@enxoval/http';
import { setupAuth } from '@enxoval/auth';
import { registerAuthRoutes } from './diplomat/http-server/auth';
import { registerRegisterRoutes } from './diplomat/http-server/register';
import { registerMeRoutes } from './diplomat/http-server/me';
import { registerStudentRoutes } from './diplomat/http-server/students';
import { registerJourneyRoutes } from './diplomat/http-server/journeys';

export function buildApp(): void {
  get('/health', async () => ({ status: 'ok' }));
  setupAuth({ exclude: ['/health', '/auth/login', '/users/register'] });
  registerAuthRoutes();
  registerRegisterRoutes();
  registerMeRoutes();
  registerStudentRoutes();
  registerJourneyRoutes();
}
