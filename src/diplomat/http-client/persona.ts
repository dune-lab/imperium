import type { StudentData } from '../../model/me';

type StudentRow = NonNullable<StudentData>;

export async function getStudentByUser(userId: string, token: string): Promise<StudentData> {
  const res = await fetch(`${process.env.PERSONA_URL}/students/by-user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`persona returned ${res.status}`);
  return res.json() as Promise<StudentRow>;
}

export async function createStudent(name: string, email: string, token: string): Promise<StudentRow> {
  const res = await fetch(`${process.env.PERSONA_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, email }),
  });
  if (!res.ok) throw new Error(`persona returned ${res.status}`);
  return res.json() as Promise<StudentRow>;
}

export async function listStudents(token: string): Promise<StudentRow[]> {
  const res = await fetch(`${process.env.PERSONA_URL}/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`persona returned ${res.status}`);
  return res.json() as Promise<StudentRow[]>;
}
