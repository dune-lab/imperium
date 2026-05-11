/**
 * diplomat/http-client/janus.ts
 *
 * HTTP client for the janus service (authentication).
 * Login is a public endpoint (auth: false in imperium.json).
 *
 * Exports:
 *   login({ email, password }) → AuthToken
 */
import { call } from '../../http';

export const login = ({ email, password }: { email: string; password: string }) =>
  call('login', { payload: { email, password } });
