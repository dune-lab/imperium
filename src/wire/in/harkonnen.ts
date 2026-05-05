/**
 * wire/in/harkonnen.ts
 * Input wire schemas for harkonnen DLQ proxy endpoints.
 * Defines the expected request shapes for reprocess and dismiss operations.
 */

import { createSchema, field } from '@enxoval/types';

/** Input for reprocessing a single DLQ message by id with an optional overridden payload. */
export const ReprocessOneWireIn = createSchema({
  id:      field.uuid(),
  payload: field.string(),
});

/** Input for reprocessing all DLQ messages for a given topic. */
export const ReprocessAllByTopicWireIn = createSchema({
  topic: field.string(),
});

/** Input for dismissing a single DLQ message by id. */
export const DismissWireIn = createSchema({
  id: field.uuid(),
});
