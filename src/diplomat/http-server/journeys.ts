import { post, get } from '@enxoval/http';
import { StartJourneyWireIn } from '../../wire/in/start-journey';
import { RepublishWireOut } from '../../wire/out/republish';
import { startJourney, listJourneys, republish } from '../../controllers/journeys';

export function registerJourneyRoutes(): void {
  post('/journeys', async (body) => startJourney(body), {
    in:  { schema: StartJourneyWireIn, name: 'StartJourneyWireIn' },
    out: null,
  });
  get('/journeys', async () => listJourneys({}), {
    in:  null,
    out: null,
  });
  post('/journeys/republish', async () => republish({}), {
    in:  null,
    out: { schema: RepublishWireOut, name: 'RepublishWireOut' },
  });
}
