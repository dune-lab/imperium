/**
 * diplomat/http-client/persona.ts
 *
 * HTTP client for the persona service (student management).
 * getStudentByUser returns null on 404 (nullable: true in imperium.json).
 *
 * Exports:
 *   getStudentByUser({ userId }) → Student | null
 *   createStudent({ name, email }) → Student
 *   listStudents() → Student[]
 */
import { call } from '../../http';

export const getStudentByUser = ({ userId }: { userId: string }) =>
  call('getStudentByUser', { payload: { userId } });

export const createStudent = ({ name, email }: { name: string; email: string }) =>
  call('createStudent', { payload: { name, email } });

export const listStudents = () =>
  call('listStudents');
