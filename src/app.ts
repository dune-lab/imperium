import { registerMeRoutes } from './diplomat/http-server/me';

export function buildApp(): void {
  registerMeRoutes();
}
