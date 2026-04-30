import { createSchema, field } from '@enxoval/types';

export const AtreidesWireIn = createSchema({
  id: field.string(),
  name: field.string(),
  email: field.string(),
  emailVerified: field.boolean(),
  role: field.string(),
  createdAt: field.string(),
});
