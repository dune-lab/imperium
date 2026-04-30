import { test, describe, it, expect, beforeAll, beforeEach } from '@enxoval/testing';

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

const userId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
const studentId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';

const user = {
  id: userId,
  name: 'Alice',
  email: 'alice@example.com',
  emailVerified: true,
  role: 'student',
  createdAt: '2025-01-01T00:00:00.000Z',
};

const student = {
  id: studentId,
  name: 'Alice',
  email: 'alice@example.com',
  userId,
  createdAt: '2025-01-01T00:00:00.000Z',
};

const journey = {
  id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
  studentId,
  currentStep: 'JOURNEY_INITIATED',
  status: 'active',
  createdAt: '2025-01-01T00:00:00.000Z',
};

let token: string;

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret';
  process.env.JWT_EXPIRES_IN = '1h';
  buildApp();
  token = signToken(userId, 'student');
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
