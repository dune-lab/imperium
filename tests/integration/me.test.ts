import { test, describe, it, expect, beforeAll, beforeEach, generate } from '@enxoval/testing';

test.mock('../../src/diplomat/http-client/atreides', () => ({
  getUser: test.fn(),
}));

test.mock('../../src/diplomat/http-client/persona', () => ({
  getStudentByUser: test.fn(),
}));

test.mock('../../src/diplomat/http-client/odyssey', () => ({
  getJourneyByStudent: test.fn(),
}));

import { buildApp } from '../../src/app';
import { inject } from '@enxoval/http';
import { signToken } from '@enxoval/auth';
import { getUser } from '../../src/diplomat/http-client/atreides';
import { getStudentByUser } from '../../src/diplomat/http-client/persona';
import { getJourneyByStudent } from '../../src/diplomat/http-client/odyssey';
import { UserData } from '../../src/model/me';
import { Student } from '../../src/model/student';
import { Journey } from '../../src/model/journey';

const userId = crypto.randomUUID();
const user = generate(UserData, { id: userId });
const student = generate(Student, { userId });
const journey = generate(Journey, { studentId: student.id, events: [] });

let token: string;

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret';
  process.env.JWT_EXPIRES_IN = '1h';
  buildApp();
  token = signToken(user.id, user.role);
});

beforeEach(() => {
  test.clearAll();
});

describe('GET /me', () => {
  it('returns full profile when user has student and journey', async () => {
    (getUser as ReturnType<typeof test.fn>).mockResolvedValue(user);
    (getStudentByUser as ReturnType<typeof test.fn>).mockResolvedValue(student);
    (getJourneyByStudent as ReturnType<typeof test.fn>).mockResolvedValue(journey);

    const res = await inject({ method: 'GET', url: '/me', headers: { authorization: `Bearer ${token}` } });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ user, student, journey });
  });

  it('returns null student and journey when user has not enrolled', async () => {
    (getUser as ReturnType<typeof test.fn>).mockResolvedValue(user);
    (getStudentByUser as ReturnType<typeof test.fn>).mockResolvedValue(null);

    const res = await inject({ method: 'GET', url: '/me', headers: { authorization: `Bearer ${token}` } });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ user, student: null, journey: null });
    expect(getJourneyByStudent).not.toHaveBeenCalled();
  });

  it('returns null journey when student exists but has no journey yet', async () => {
    (getUser as ReturnType<typeof test.fn>).mockResolvedValue(user);
    (getStudentByUser as ReturnType<typeof test.fn>).mockResolvedValue(student);
    (getJourneyByStudent as ReturnType<typeof test.fn>).mockResolvedValue(null);

    const res = await inject({ method: 'GET', url: '/me', headers: { authorization: `Bearer ${token}` } });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ user, student, journey: null });
  });

  it('returns 401 with no authorization header', async () => {
    const res = await inject({ method: 'GET', url: '/me' });
    expect(res.statusCode).toBe(401);
  });

  it('returns 401 with invalid token', async () => {
    const res = await inject({ method: 'GET', url: '/me', headers: { authorization: 'Bearer invalid.token.here' } });
    expect(res.statusCode).toBe(401);
  });
});
