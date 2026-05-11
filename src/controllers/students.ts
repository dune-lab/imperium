import { asyncFn, field, UnauthorizedError } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { CreateStudentWireIn } from '../wire/in/create-student';
import { NoInput } from '../wire/in/no-input';
import { Student } from '../model/student';
import * as diplomat from '../diplomat/http-client';

export const createStudent = asyncFn(CreateStudentWireIn, Student, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return diplomat.createStudent(input);
});

export const listStudents = asyncFn(NoInput, field.array(Student), async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return diplomat.listStudents(input);
});
