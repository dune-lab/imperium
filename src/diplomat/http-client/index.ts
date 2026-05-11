/**
 * diplomat/http-client/index.ts
 *
 * Single entry point for all outbound HTTP calls from imperium.
 * External service names are confined to imperium.json — only domain
 * function names are visible to callers.
 */
import { defineHttpAliases } from '@enxoval/http';
import { nullable, field } from '@enxoval/types';
import { HarkonnenMessage } from '@enxoval/messaging';
import { UserData } from '../../model/me';
import { AuthToken } from '../../model/auth';
import { Student } from '../../model/student';
import { Journey } from '../../model/journey';
import { RepublishWireOut } from '../../wire/out/republish';
import { ReprocessOneWireOut, ReprocessAllWireOut, DismissWireOut } from '../../wire/out/harkonnen';

const { call } = defineHttpAliases({
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

export const getUser = ({ userId }: { userId: string }) =>
  call('getUser', { payload: { userId } });

export const createUser = ({ name, email, password, role }: { name: string; email: string; password: string; role: string }) =>
  call('createUser', { payload: { name, email, password, role } });

export const getStudentByUser = ({ userId }: { userId: string }) =>
  call('getStudentByUser', { payload: { userId } });

export const createStudent = ({ name, email }: { name: string; email: string }) =>
  call('createStudent', { payload: { name, email } });

export const listStudents = () =>
  call('listStudents');

export const getJourneyByStudent = ({ studentId }: { studentId: string }) =>
  call('getJourneyByStudent', { payload: { studentId } });

export const startJourney = ({ studentId }: { studentId: string }) =>
  call('startJourney', { payload: { studentId } });

export const listJourneys = () =>
  call('listJourneys');

export const republish = () =>
  call('republish');

export const listDlq = () =>
  call('listDlq');

export const reprocessDlqOne = ({ id, payload }: { id: string; payload: string }) =>
  call('reprocessDlqOne', { payload: { id, payload } });

export const reprocessDlqAllByTopic = ({ topic }: { topic: string }) =>
  call('reprocessDlqAllByTopic', { payload: { topic } });

export const dismissDlq = ({ id }: { id: string }) =>
  call('dismissDlq', { payload: { id } });

export const login = ({ email, password }: { email: string; password: string }) =>
  call('login', { payload: { email, password } });
