import { asyncFn, nullable, field, createSchema } from '@enxoval/types';
import { Journey } from '../../model/journey';
import { RepublishWireOut } from '../../wire/out/republish';

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
