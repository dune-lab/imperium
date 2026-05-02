import { asyncFn, nullable, field, createSchema } from '@enxoval/types';
import { Student } from '../../model/student';

const GetStudentByUserInput = createSchema({
  userId: field.uuid(),
  token: field.string(),
});

const CreateStudentInput = createSchema({
  name: field.string(),
  email: field.string(),
  token: field.string(),
});

const ListStudentsInput = createSchema({
  token: field.string(),
});

export const getStudentByUser = asyncFn(GetStudentByUserInput, nullable(Student), async (input) => {
  const res = await fetch(`${process.env.PERSONA_URL}/students/by-user/${input.userId}`, {
    headers: { Authorization: `Bearer ${input.token}` },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`persona returned ${res.status}`);
  return Student.parse(await res.json());
});

export const createStudent = asyncFn(CreateStudentInput, Student, async (input) => {
  const res = await fetch(`${process.env.PERSONA_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${input.token}` },
    body: JSON.stringify({ name: input.name, email: input.email }),
  });
  if (!res.ok) throw new Error(`persona returned ${res.status}`);
  return Student.parse(await res.json());
});

export const listStudents = asyncFn(ListStudentsInput, field.array(Student), async (input) => {
  const res = await fetch(`${process.env.PERSONA_URL}/students`, {
    headers: { Authorization: `Bearer ${input.token}` },
  });
  if (!res.ok) throw new Error(`persona returned ${res.status}`);
  return field.array(Student).parse(await res.json());
});
