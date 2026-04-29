import type { StudentData } from '../../model/me';

export async function getStudentByUser(userId: string, token: string): Promise<StudentData> {
  const res = await fetch(`${process.env.PERSONA_URL}/students/by-user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`persona returned ${res.status}`);
  return res.json() as Promise<StudentData>;
}
