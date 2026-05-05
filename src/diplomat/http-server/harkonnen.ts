/**
 * diplomat/http-server/harkonnen.ts
 * HTTP route registration for harkonnen DLQ proxy endpoints.
 * Exposes GET /harkonnen and POST routes for reprocess/dismiss operations.
 */

import { get, post } from '@enxoval/http';
import {
  listDlqMessages,
  reprocessDlqOne,
  reprocessDlqAllByTopic,
  dismissDlqMessage,
} from '../../controllers/harkonnen';

/**
 * Registers all harkonnen DLQ proxy routes on the HTTP server.
 * Routes:
 *   GET  /harkonnen                  — list all DLQ messages
 *   POST /harkonnen/reprocess        — reprocess a single message by id
 *   POST /harkonnen/reprocess-all    — reprocess all messages for a topic
 *   POST /harkonnen/dismiss          — dismiss a single message by id
 */
export function registerHarkonnenRoutes(): void {
  get('/harkonnen', async () => listDlqMessages({}));
  post('/harkonnen/reprocess',     async (body) => reprocessDlqOne(body));
  post('/harkonnen/reprocess-all', async (body) => reprocessDlqAllByTopic(body));
  post('/harkonnen/dismiss',       async (body) => dismissDlqMessage(body));
}
