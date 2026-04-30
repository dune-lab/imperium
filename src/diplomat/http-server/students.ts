import { post, get } from '@enxoval/http';
import { getCurrentUser } from '@enxoval/auth';
import { UnauthorizedError } from '@enxoval/types';
import { CreateStudentWireIn } from '../../wire/in/create-student';
import { createStudent, listStudents } from '../../controllers/students';

export function registerStudentRoutes(): void {
  post('/students', async (body) => {
    const auth = getCurrentUser();
    if (!auth) throw new UnauthorizedError('Unauthorized');
    const input = CreateStudentWireIn.parse(body);
    return createStudent(input.name, input.email, auth.token);
  });

  get('/students', async () => {
    const auth = getCurrentUser();
    if (!auth) throw new UnauthorizedError('Unauthorized');
    return listStudents(auth.token);
  });
}
