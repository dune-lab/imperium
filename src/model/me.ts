import { createSchema, field } from '@enxoval/types';
import { Student } from './student';
import { Journey } from './journey';

export const UserData = createSchema({
  id: field.string(),
  name: field.string(),
  email: field.string(),
  emailVerified: field.boolean(),
  role: field.string(),
  createdAt: field.string(),
});

export const Me = createSchema({
  user: field.nested(UserData),
  student: field.nullable(field.nested(Student)),
  journey: field.nullable(field.nested(Journey)),
});
