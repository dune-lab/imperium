import { createSchema, field } from '@enxoval/types';

export const Journey = createSchema({
  id: field.string(),
  studentId: field.uuid(),
  currentStep: field.string(),
  status: field.string(),
  createdAt: field.string(),
});
