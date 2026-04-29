"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
async function getUser(userId, token) {
    const res = await fetch(`${process.env.ATREIDES_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok)
        throw new Error(`atreides returned ${res.status}`);
    return res.json();
}
