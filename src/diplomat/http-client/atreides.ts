import { asyncFn, createSchema, field } from '@enxoval/types';
import { UserData } from '../../model/me';

const GetUserInput = createSchema({
  userId: field.string(),
  token: field.string(),
});

const CreateUserInput = createSchema({
  name: field.string(),
  email: field.string(),
  password: field.string(),
  role: field.string(),
});

export const getUser = asyncFn(GetUserInput, UserData, async (input) => {
  const res = await fetch(`${process.env.ATREIDES_URL}/users/${input.userId}`, {
    headers: { Authorization: `Bearer ${input.token}` },
  });
  if (!res.ok) throw new Error(`atreides returned ${res.status}`);
  return UserData.parse(await res.json());
});

export const createUser = asyncFn(CreateUserInput, UserData, async (input) => {
  const res = await fetch(`${process.env.ATREIDES_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: input.name, email: input.email, password: input.password, role: input.role }),
  });
  if (!res.ok) throw new Error(`atreides returned ${res.status}`);
  return UserData.parse(await res.json());
});
