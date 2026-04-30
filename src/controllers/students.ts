import type { Student } from '../model/student';
import { createStudent as personaCreate, listStudents as personaList } from '../diplomat/http-client/persona';

export async function createStudent(name: string, email: string, token: string): Promise<Student> {
  return personaCreate(name, email, token);
}

export async function listStudents(token: string): Promise<Student[]> {
  return personaList(token);
}
