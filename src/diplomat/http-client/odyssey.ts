/**
 * diplomat/http-client/odyssey.ts
 *
 * HTTP client for the odyssey service (journey and DLQ management).
 * getJourneyByStudent returns null on 404 (nullable: true in imperium.json).
 *
 * Exports:
 *   getJourneyByStudent({ studentId })         → Journey | null
 *   startJourney({ studentId })                → Journey
 *   listJourneys()                             → Journey[]
 *   republish()                                → RepublishWireOut
 *   listDlq()                                  → HarkonnenMessage[]
 *   reprocessDlqOne({ id, payload })           → ReprocessOneWireOut
 *   reprocessDlqAllByTopic({ topic })          → ReprocessAllWireOut
 *   dismissDlq({ id })                         → DismissWireOut
 */
import { call } from '../../http';

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
