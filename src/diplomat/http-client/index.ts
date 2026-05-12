/**
 * diplomat/http-client/index.ts
 *
 * Single entry point for all outbound HTTP calls from imperium.
 * External service names are confined to imperium.json — only domain
 * function names are visible to callers.
 */
import { defineHttpAliases } from '@enxoval/http';
import { asyncFn, nullable, field, createSchema } from '@enxoval/types';
import { UserData } from '../../model/me';
import { AuthToken } from '../../model/auth';
import { Student } from '../../model/student';
import { Journey } from '../../model/journey';
import { RepublishWireOut } from '../../wire/out/republish';
import { RegisterWireIn } from '../../wire/in/register';
import { CreateStudentWireIn } from '../../wire/in/create-student';
import { StartJourneyWireIn } from '../../wire/in/start-journey';
import { LoginWireIn } from '../../wire/in/login';
import { NoInput } from '../../wire/in/no-input';

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
  login:                  AuthToken,
});

const GetUserIn = createSchema({ userId: field.uuid() });
const GetStudentIn = createSchema({ userId: field.uuid() });
const GetJourneyIn = createSchema({ studentId: field.uuid() });

export const getUser = asyncFn(GetUserIn, UserData, (input) =>
  call('getUser', { payload: input }));

export const createUser = asyncFn(RegisterWireIn, UserData, (input) =>
  call('createUser', { payload: input }));

export const getStudentByUser = asyncFn(GetStudentIn, nullable(Student), (input) =>
  call('getStudentByUser', { payload: input }));

export const createStudent = asyncFn(CreateStudentWireIn, Student, (input) =>
  call('createStudent', { payload: input }));

export const listStudents = asyncFn(NoInput, field.array(Student), () =>
  call('listStudents'));

export const getJourneyByStudent = asyncFn(GetJourneyIn, nullable(Journey), (input) =>
  call('getJourneyByStudent', { payload: input }));

export const startJourney = asyncFn(StartJourneyWireIn, Journey, (input) =>
  call('startJourney', { payload: input }));

export const listJourneys = asyncFn(NoInput, field.array(Journey), () =>
  call('listJourneys'));

export const republish = asyncFn(NoInput, RepublishWireOut, () =>
  call('republish'));

export const login = asyncFn(LoginWireIn, AuthToken, (input) =>
  call('login', { payload: input }));
