import { createSchema, field } from '@enxoval/types';

export const JourneyEvent = createSchema({
  id: field.string(),
  name: field.string(),
  createdAt: field.string(),
});

export const Journey = createSchema({
  id: field.string(),
  studentId: field.uuid(),
  currentStep: field.string(),
  status: field.string(),
  createdAt: field.string(),
  events: field.nested(field.array(JourneyEvent)),
});
