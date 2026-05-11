/**
 * src/http.ts
 *
 * Registers all HTTP aliases for imperium.
 * Reads routing from imperium.json (http section) and maps each alias
 * to its output schema. Returns a typed call() function for use by
 * the http-client modules.
 *
 * Input:  none (reads from imperium.json at module init)
 * Output: { call } — typed function that resolves alias → HTTP call → parsed output
 */
import { defineHttpAliases } from '@enxoval/http';
import { nullable, field } from '@enxoval/types';
import { HarkonnenMessage } from '@enxoval/messaging';
import { UserData } from './model/me';
import { AuthToken } from './model/auth';
import { Student } from './model/student';
import { Journey } from './model/journey';
import { RepublishWireOut } from './wire/out/republish';
import { ReprocessOneWireOut, ReprocessAllWireOut, DismissWireOut } from './wire/out/harkonnen';

export const { call } = defineHttpAliases({
  getUser:                UserData,
  createUser:             UserData,
  getStudentByUser:       nullable(Student),
  createStudent:          Student,
  listStudents:           field.array(Student),
  getJourneyByStudent:    nullable(Journey),
  startJourney:           Journey,
  listJourneys:           field.array(Journey),
  republish:              RepublishWireOut,
  listDlq:                field.array(HarkonnenMessage),
  reprocessDlqOne:        ReprocessOneWireOut,
  reprocessDlqAllByTopic: ReprocessAllWireOut,
  dismissDlq:             DismissWireOut,
  login:                  AuthToken,
});
