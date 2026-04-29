"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJourneyByStudent = getJourneyByStudent;
async function getJourneyByStudent(studentId, token) {
    const res = await fetch(`${process.env.ODYSSEY_URL}/journeys/by-student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 404)
        return null;
    if (!res.ok)
        throw new Error(`odyssey returned ${res.status}`);
    return res.json();
}
