import { post, get } from '@enxoval/http';
import { CreateStudentWireIn } from '../../wire/in/create-student';
import { createStudent, listStudents } from '../../controllers/students';

export function registerStudentRoutes(): void {
  post('/students', async (body) => createStudent(body), {
    in:  { schema: CreateStudentWireIn, name: 'CreateStudentWireIn' },
    out: null,
  });
  get('/students', async () => listStudents({}), {
    in:  null,
    out: null,
  });
}
