import type { JourneyData } from '../../model/me';

export async function getJourneyByStudent(studentId: string, token: string): Promise<JourneyData> {
  const res = await fetch(`${process.env.ODYSSEY_URL}/journeys/by-student/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return res.json() as Promise<JourneyData>;
}
