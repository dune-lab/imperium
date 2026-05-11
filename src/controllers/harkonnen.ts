import { asyncFn, field, UnauthorizedError } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { NoInput } from '../wire/in/no-input';
import { ReprocessOneWireIn, ReprocessAllByTopicWireIn, DismissWireIn } from '../wire/in/harkonnen';
import { ReprocessOneWireOut, ReprocessAllWireOut, DismissWireOut } from '../wire/out/harkonnen';
import { HarkonnenMessage } from '@enxoval/messaging';
import * as diplomat from '../diplomat/http-client';

export const listDlqMessages = asyncFn(NoInput, field.array(HarkonnenMessage), async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return diplomat.listDlq(input);
});

export const reprocessDlqOne = asyncFn(ReprocessOneWireIn, ReprocessOneWireOut, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return diplomat.reprocessDlqOne(input);
});

export const reprocessDlqAllByTopic = asyncFn(ReprocessAllByTopicWireIn, ReprocessAllWireOut, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return diplomat.reprocessDlqAllByTopic(input);
});

export const dismissDlqMessage = asyncFn(DismissWireIn, DismissWireOut, async (input) => {
  const auth = getCurrentUser();
  if (!auth) throw new UnauthorizedError('Unauthorized');
  return diplomat.dismissDlq(input);
});
