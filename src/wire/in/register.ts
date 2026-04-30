import { createSchema, field } from '@enxoval/types';

export const RegisterWireIn = createSchema({
  name: field.string(),
  email: field.string(),
  password: field.string(),
  role: field.literal('student', 'admin'),
});
