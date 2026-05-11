import { asyncFn, field, UnauthorizedError } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { StartJourneyWireIn } from '../wire/in/start-journey';
import { NoInput } from '../wire/in/no-input';
import { Journey } from '../model/journey';
import { RepublishWireOut } from '../wire/out/republish';
import * as diplomat from '../diplomat/http-client';

export const startJourney = asyncFn(StartJourneyWireIn, Journey, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return diplomat.startJourney(input);
});

export const listJourneys = asyncFn(NoInput, field.array(Journey), async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return diplomat.listJourneys(input);
});

export const republish = asyncFn(NoInput, RepublishWireOut, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return diplomat.republish(input);
});
