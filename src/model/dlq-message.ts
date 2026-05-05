/**
 * dlq-message.ts
 * Schema for DLQ (Dead Letter Queue) message model used across the imperium DLQ proxy.
 * Represents a failed message stored in the harkonnen DLQ service.
 */

import { createSchema, field } from '@enxoval/types';

export const DlqMessage = createSchema({
  id:             field.uuid(),
  originalTopic:  field.string(),
  name:           field.string(),
  payload:        field.string(),
  error:          field.string(),
  failedAt:       field.string(),
  status:         field.string(),
  reprocessedAt:  field.nullable(field.string()),
  createdAt:      field.string(),
});
