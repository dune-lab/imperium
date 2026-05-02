import { asyncFn, field, UnauthorizedError } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { CreateStudentWireIn } from '../wire/in/create-student';
import { NoInput } from '../wire/in/no-input';
import { Student } from '../model/student';
import { createStudent as personaCreate, listStudents as personaList } from '../diplomat/http-client/persona';

export const createStudent = asyncFn(CreateStudentWireIn, Student, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return personaCreate({ name: input.name, email: input.email, token: auth.token });
});

export const listStudents = asyncFn(NoInput, field.array(Student), async (_) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return personaList({ token: auth.token });
});
