import { get } from '@enxoval/http';
import { setupAuth } from '@enxoval/auth';
import { registerAuthRoutes } from './diplomat/http-server/auth';
import { registerRegisterRoutes } from './diplomat/http-server/register';
import { registerMeRoutes } from './diplomat/http-server/me';
import { registerStudentRoutes } from './diplomat/http-server/students';
import { registerJourneyRoutes } from './diplomat/http-server/journeys';
import { registerJourneyStreamRoute } from './diplomat/http-server/journey-stream';
import { registerHarkonnenRoutes } from './diplomat/http-server/harkonnen';

export function buildApp(): void {
  get('/health', async () => ({ status: 'ok' }));
  setupAuth({ exclude: ['/health', '/auth/login', '/users/register', '/routes', '/contracts', '/journeys/:journeyId/stream'] });
  registerAuthRoutes();
  registerRegisterRoutes();
  registerMeRoutes();
  registerStudentRoutes();
  registerJourneyRoutes();
  registerJourneyStreamRoute();
  registerHarkonnenRoutes();
}
