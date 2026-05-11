import { asyncFn, field, UnauthorizedError } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { CreateStudentWireIn } from '../wire/in/create-student';
import { NoInput } from '../wire/in/no-input';
import { Student } from '../model/student';
import { createStudent, listStudents } from '../diplomat/http-client';

export const createStudent = asyncFn(CreateStudentWireIn, Student, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return createStudent({ name: input.name, email: input.email });
});

export const listStudents = asyncFn(NoInput, field.array(Student), async (_) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return listStudents();
});
