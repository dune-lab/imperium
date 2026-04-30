import { createSchema, field } from '@enxoval/types';

export const CreateStudentWireIn = createSchema({
  name: field.string(),
  email: field.string(),
});
