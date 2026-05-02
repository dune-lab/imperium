import { asyncFn, UnauthorizedError } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { NoInput } from '../wire/in/no-input';
import { Me } from '../model/me';
import { getUser } from '../diplomat/http-client/atreides';
import { getStudentByUser } from '../diplomat/http-client/persona';
import { getJourneyByStudent } from '../diplomat/http-client/odyssey';

export const getMe = asyncFn(NoInput, Me, async (_) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');

  const [user, student] = await Promise.all([
    getUser({ userId: auth.userId, token: auth.token }),
    getStudentByUser({ userId: auth.userId, token: auth.token }),
  ]);

  const journey = student
    ? await getJourneyByStudent({ studentId: student.id, token: auth.token })
    : null;

  return { user, student, journey };
});
