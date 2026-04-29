import type { Me } from '../model/me';
import { getUser } from '../diplomat/http-client/atreides';
import { getStudentByUser } from '../diplomat/http-client/persona';
import { getJourneyByStudent } from '../diplomat/http-client/odyssey';
import { toMe } from '../adapters/me';

export async function getMe(userId: string, token: string): Promise<Me> {
  const [user, student] = await Promise.all([
    getUser(userId, token),
    getStudentByUser(userId, token),
  ]);

  const journey = student ? await getJourneyByStudent(student.id, token) : null;

  return toMe(user, student, journey);
}
