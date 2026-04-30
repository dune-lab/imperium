import { createSchema, field } from '@enxoval/types';

export const OdysseyWireIn = createSchema({
  id: field.uuid(),
  studentId: field.uuid(),
  currentStep: field.string(),
  status: field.string(),
  createdAt: field.string(),
});
