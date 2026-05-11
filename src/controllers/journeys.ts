import { asyncFn, field, UnauthorizedError } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { StartJourneyWireIn } from '../wire/in/start-journey';
import { NoInput } from '../wire/in/no-input';
import { Journey } from '../model/journey';
import { RepublishWireOut } from '../wire/out/republish';
import { startJourney, listJourneys, republish } from '../diplomat/http-client';

export const startJourney = asyncFn(StartJourneyWireIn, Journey, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return startJourney({ studentId: input.studentId });
});

export const listJourneys = asyncFn(NoInput, field.array(Journey), async (_) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return listJourneys();
});

export const republish = asyncFn(NoInput, RepublishWireOut, async (_) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return republish();
});
