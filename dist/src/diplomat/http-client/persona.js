"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentByUser = getStudentByUser;
async function getStudentByUser(userId, token) {
    const res = await fetch(`${process.env.PERSONA_URL}/students/by-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 404)
        return null;
    if (!res.ok)
        throw new Error(`persona returned ${res.status}`);
    return res.json();
}
