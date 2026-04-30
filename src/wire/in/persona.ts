import { createSchema, field } from '@enxoval/types';

export const PersonaWireIn = createSchema({
  id: field.uuid(),
  name: field.string(),
  email: field.string(),
  userId: field.uuid(),
  createdAt: field.string(),
});
