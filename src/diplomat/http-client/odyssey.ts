import type { JourneyData } from '../../model/me';

type JourneyRow = NonNullable<JourneyData>;

export async function getJourneyByStudent(studentId: string, token: string): Promise<JourneyData> {
  const res = await fetch(`${process.env.ODYSSEY_URL}/journeys/by-student/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return res.json() as Promise<JourneyRow>;
}

export async function startJourney(studentId: string, token: string): Promise<JourneyRow> {
  const res = await fetch(`${process.env.ODYSSEY_URL}/journeys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ studentId }),
  });
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return res.json() as Promise<JourneyRow>;
}

export async function listJourneys(token: string): Promise<JourneyRow[]> {
  const res = await fetch(`${process.env.ODYSSEY_URL}/journeys`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return res.json() as Promise<JourneyRow[]>;
}

export async function republish(token: string): Promise<{ republished: number }> {
  const res = await fetch(`${process.env.ODYSSEY_URL}/journeys/republish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return res.json() as Promise<{ republished: number }>;
}
