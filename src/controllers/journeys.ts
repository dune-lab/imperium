import type { Journey } from '../model/journey';
import {
  startJourney as odysseyStart,
  listJourneys as odysseyList,
  republish as odysseyRepublish,
} from '../diplomat/http-client/odyssey';

export async function startJourney(studentId: string, token: string): Promise<Journey> {
  return odysseyStart(studentId, token);
}

export async function listJourneys(token: string): Promise<Journey[]> {
  return odysseyList(token);
}

export async function republish(token: string): Promise<{ republished: number }> {
  return odysseyRepublish(token);
}
