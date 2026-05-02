import { createSchema, field } from '@enxoval/types';

export const AuthToken = createSchema({
  token: field.string(),
});
