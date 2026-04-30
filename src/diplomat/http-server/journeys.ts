import { post, get } from '@enxoval/http';
import { getCurrentUser } from '@enxoval/auth';
import { UnauthorizedError } from '@enxoval/types';
import { StartJourneyWireIn } from '../../wire/in/start-journey';
import { startJourney, listJourneys, republish } from '../../controllers/journeys';

export function registerJourneyRoutes(): void {
  post('/journeys', async (body) => {
    const auth = getCurrentUser();
    if (!auth) throw new UnauthorizedError('Unauthorized');
    const input = StartJourneyWireIn.parse(body);
    return startJourney(input.studentId, auth.token);
  });

  get('/journeys', async () => {
    const auth = getCurrentUser();
    if (!auth) throw new UnauthorizedError('Unauthorized');
    return listJourneys(auth.token);
  });

  post('/journeys/republish', async () => {
    const auth = getCurrentUser();
    if (!auth) throw new UnauthorizedError('Unauthorized');
    return republish(auth.token);
  });
}
