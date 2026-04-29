import type { UserData } from '../../model/me';

export async function getUser(userId: string, token: string): Promise<UserData> {
  const res = await fetch(`${process.env.ATREIDES_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`atreides returned ${res.status}`);
  return res.json() as Promise<UserData>;
}
