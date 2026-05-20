import { sseRoute } from '@enxoval/http';
import { UnauthorizedError } from '@enxoval/types';
import * as jwt from 'jsonwebtoken';

export function registerJourneyStreamRoute(): void {
  sseRoute<{ journeyId: string }, { token: string }>(
    '/journeys/:journeyId/stream',
    async ({ journeyId }, { token }, send, signal) => {
      if (!token) throw new UnauthorizedError('Token required');

      try {
        jwt.verify(token, process.env.JWT_SECRET as string);
      } catch {
        throw new UnauthorizedError('Invalid token');
      }

      const upstream = await fetch(
        `${process.env.ODYSSEY_URL}/journeys/${journeyId}/stream`,
        { signal },
      );

      if (!upstream.ok || !upstream.body) return;

      const reader = upstream.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const chunks = buffer.split('\n\n');
          buffer = chunks.pop() ?? '';
          for (const chunk of chunks) {
            const line = chunk.split('\n').find((l) => l.startsWith('data: '));
            if (line) {
              try {
                send(JSON.parse(line.slice(6)) as object);
              } catch {
                // ignore malformed data
              }
            }
          }
        }
      } finally {
        reader.cancel();
      }
    },
    { in: null, out: null },
  );
}
