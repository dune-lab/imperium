import { asyncFn, nullable, field, createSchema } from '@enxoval/types';
import { Journey } from '../../model/journey';
import { RepublishWireOut } from '../../wire/out/republish';
import { HarkonnenMessage } from '@enxoval/messaging';
import { ReprocessOneWireOut, ReprocessAllWireOut, DismissWireOut } from '../../wire/out/harkonnen';

const GetJourneyByStudentInput = createSchema({
  studentId: field.uuid(),
  token: field.string(),
});

const StartJourneyInput = createSchema({
  studentId: field.uuid(),
  token: field.string(),
});

const TokenInput = createSchema({
  token: field.string(),
});

export const getJourneyByStudent = asyncFn(GetJourneyByStudentInput, nullable(Journey), async (input) => {
  const res = await fetch(`${process.env.ODYSSEY_URL}/journeys/by-student/${input.studentId}`, {
    headers: { Authorization: `Bearer ${input.token}` },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return Journey.parse(await res.json());
});

export const startJourney = asyncFn(StartJourneyInput, Journey, async (input) => {
  const res = await fetch(`${process.env.ODYSSEY_URL}/journeys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${input.token}` },
    body: JSON.stringify({ studentId: input.studentId }),
  });
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return Journey.parse(await res.json());
});

export const listJourneys = asyncFn(TokenInput, field.array(Journey), async (input) => {
  const res = await fetch(`${process.env.ODYSSEY_URL}/journeys`, {
    headers: { Authorization: `Bearer ${input.token}` },
  });
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return field.array(Journey).parse(await res.json());
});

export const republish = asyncFn(TokenInput, RepublishWireOut, async (input) => {
  const res = await fetch(`${process.env.ODYSSEY_URL}/journeys/republish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${input.token}` },
  });
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return RepublishWireOut.parse(await res.json());
});

// --- Harkonnen DLQ proxy schemas ---

const ReprocessOneClientInput = createSchema({
  token:   field.string(),
  id:      field.uuid(),
  payload: field.string(),
});

const ReprocessAllClientInput = createSchema({
  token: field.string(),
  topic: field.string(),
});

const DismissClientInput = createSchema({
  token: field.string(),
  id:    field.uuid(),
});

/**
 * Fetches all DLQ messages from the odyssey harkonnen endpoint.
 * Input: token (Bearer auth)
 * Output: array of HarkonnenMessage
 */
export const listDlq = asyncFn(TokenInput, field.array(HarkonnenMessage), async (input) => {
  const res = await fetch(`${process.env.ODYSSEY_URL}/harkonnen`, {
    headers: { Authorization: `Bearer ${input.token}` },
  });
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return field.array(HarkonnenMessage).parse(await res.json());
});

/**
 * Reprocesses a single DLQ message by id with an optionally overridden payload.
 * Input: token, id (uuid), payload (string)
 * Output: ReprocessOneWireOut { reprocessed: boolean }
 */
export const reprocessDlqOne = asyncFn(ReprocessOneClientInput, ReprocessOneWireOut, async (input) => {
  const res = await fetch(`${process.env.ODYSSEY_URL}/harkonnen/reprocess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${input.token}` },
    body: JSON.stringify({ id: input.id, payload: input.payload }),
  });
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return ReprocessOneWireOut.parse(await res.json());
});

/**
 * Reprocesses all DLQ messages for a given topic.
 * Input: token, topic (string)
 * Output: ReprocessAllWireOut { reprocessed: number }
 */
export const reprocessDlqAllByTopic = asyncFn(ReprocessAllClientInput, ReprocessAllWireOut, async (input) => {
  const res = await fetch(`${process.env.ODYSSEY_URL}/harkonnen/reprocess-all`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${input.token}` },
    body: JSON.stringify({ topic: input.topic }),
  });
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return ReprocessAllWireOut.parse(await res.json());
});

/**
 * Dismisses a single DLQ message by id.
 * Input: token, id (uuid)
 * Output: DismissWireOut { dismissed: boolean }
 */
export const dismissDlq = asyncFn(DismissClientInput, DismissWireOut, async (input) => {
  const res = await fetch(`${process.env.ODYSSEY_URL}/harkonnen/dismiss`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${input.token}` },
    body: JSON.stringify({ id: input.id }),
  });
  if (!res.ok) throw new Error(`odyssey returned ${res.status}`);
  return DismissWireOut.parse(await res.json());
});
