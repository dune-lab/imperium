import { asyncFn, field, UnauthorizedError } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { StartJourneyWireIn } from '../wire/in/start-journey';
import { NoInput } from '../wire/in/no-input';
import { Journey } from '../model/journey';
import { RepublishWireOut } from '../wire/out/republish';
import {
  startJourney as odysseyStart,
  listJourneys as odysseyList,
  republish as odysseyRepublish,
} from '../diplomat/http-client/odyssey';

export const startJourney = asyncFn(StartJourneyWireIn, Journey, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return odysseyStart({ studentId: input.studentId, token: auth.token });
});

export const listJourneys = asyncFn(NoInput, field.array(Journey), async (_) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return odysseyList({ token: auth.token });
});

export const republish = asyncFn(NoInput, RepublishWireOut, async (_) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return odysseyRepublish({ token: auth.token });
});
