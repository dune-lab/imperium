/**
 * wire/out/harkonnen.ts
 * Output wire schemas for harkonnen DLQ proxy endpoints.
 * Defines the response shapes returned by reprocess and dismiss operations.
 */

import { createSchema, field } from '@enxoval/types';

/** Response for a single DLQ message reprocess operation. */
export const ReprocessOneWireOut = createSchema({
  reprocessed: field.boolean(),
});

/** Response for a bulk DLQ reprocess-all-by-topic operation. */
export const ReprocessAllWireOut = createSchema({
  reprocessed: field.number(),
});

/** Response for a DLQ message dismiss operation. */
export const DismissWireOut = createSchema({
  dismissed: field.boolean(),
});
