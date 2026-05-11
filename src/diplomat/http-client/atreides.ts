/**
 * diplomat/http-client/atreides.ts
 *
 * HTTP client for the atreides service (user management).
 * Uses call() from src/http.ts — URL, token and error handling are automatic.
 *
 * Exports:
 *   getUser({ userId })                              → UserData
 *   createUser({ name, email, password, role })      → UserData
 */
import { call } from '../../http';

export const getUser = ({ userId }: { userId: string }) =>
  call('getUser', { payload: { userId } });

export const createUser = ({ name, email, password, role }: { name: string; email: string; password: string; role: string }) =>
  call('createUser', { payload: { name, email, password, role } });
