import { asyncFn, UnauthorizedError } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { NoInput } from '../wire/in/no-input';
import { Me } from '../model/me';
import { getUser, getStudentByUser, getJourneyByStudent } from '../diplomat/http-client';

export const getMe = asyncFn(NoInput, Me, async (_) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');

  const [user, student] = await Promise.all([
    getUser({ userId: auth.userId }),
    getStudentByUser({ userId: auth.userId }),
  ]);

  const journey = student
    ? await getJourneyByStudent({ studentId: student.id })
    : null;

  return { user, student, journey };
});
