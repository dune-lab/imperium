import type { UserData } from '../../model/me';

export async function getUser(userId: string, token: string): Promise<UserData> {
  const res = await fetch(`${process.env.ATREIDES_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`atreides returned ${res.status}`);
  return res.json() as Promise<UserData>;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<UserData> {
  const res = await fetch(`${process.env.ATREIDES_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  });
  if (!res.ok) throw new Error(`atreides returned ${res.status}`);
  return res.json() as Promise<UserData>;
}
