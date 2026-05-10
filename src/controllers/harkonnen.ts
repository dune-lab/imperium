/**
 * controllers/harkonnen.ts
 * Harkonnen DLQ proxy controllers for imperium.
 * Authenticates the current user and delegates DLQ operations to the odyssey http-client.
 */

import { asyncFn, field, UnauthorizedError } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { NoInput } from '../wire/in/no-input';
import { ReprocessOneWireIn, ReprocessAllByTopicWireIn, DismissWireIn } from '../wire/in/harkonnen';
import { ReprocessOneWireOut, ReprocessAllWireOut, DismissWireOut } from '../wire/out/harkonnen';
import { HarkonnenMessage } from '@enxoval/messaging';
import {
  listDlq as odysseyList,
  reprocessDlqOne as odysseyReprocessOne,
  reprocessDlqAllByTopic as odysseyReprocessAll,
  dismissDlq as odysseyDismiss,
} from '../diplomat/http-client/odyssey';

/**
 * Lists all DLQ messages for the authenticated user.
 * Input: NoInput (empty)
 * Output: array of HarkonnenMessage
 */
export const listDlqMessages = asyncFn(NoInput, field.array(HarkonnenMessage), async (_) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return odysseyList({ token: auth.token });
});

/**
 * Reprocesses a single DLQ message by id.
 * Input: ReprocessOneWireIn { id, payload }
 * Output: ReprocessOneWireOut { reprocessed: boolean }
 */
export const reprocessDlqOne = asyncFn(ReprocessOneWireIn, ReprocessOneWireOut, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return odysseyReprocessOne({ token: auth.token, id: input.id, payload: input.payload });
});

/**
 * Reprocesses all DLQ messages for a given topic.
 * Input: ReprocessAllByTopicWireIn { topic }
 * Output: ReprocessAllWireOut { reprocessed: number }
 */
export const reprocessDlqAllByTopic = asyncFn(ReprocessAllByTopicWireIn, ReprocessAllWireOut, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return odysseyReprocessAll({ token: auth.token, topic: input.topic });
});

/**
 * Dismisses a single DLQ message by id.
 * Input: DismissWireIn { id }
 * Output: DismissWireOut { dismissed: boolean }
 */
export const dismissDlqMessage = asyncFn(DismissWireIn, DismissWireOut, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return odysseyDismiss({ token: auth.token, id: input.id });
});
