export async function login(email: string, password: string): Promise<{ token: string }> {
  const res = await fetch(`${process.env.JANUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`janus returned ${res.status}`);
  return res.json() as Promise<{ token: string }>;
}
