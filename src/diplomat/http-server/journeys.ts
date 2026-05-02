import { post, get } from '@enxoval/http';
import { startJourney, listJourneys, republish } from '../../controllers/journeys';

export function registerJourneyRoutes(): void {
  post('/journeys', async (body) => startJourney(body));
  get('/journeys', async () => listJourneys({}));
  post('/journeys/republish', async () => republish({}));
}
