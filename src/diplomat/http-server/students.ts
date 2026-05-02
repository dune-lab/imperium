import { post, get } from '@enxoval/http';
import { createStudent, listStudents } from '../../controllers/students';

export function registerStudentRoutes(): void {
  post('/students', async (body) => createStudent(body));
  get('/students', async () => listStudents({}));
}
