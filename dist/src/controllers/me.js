"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = getMe;
const atreides_1 = require("../diplomat/http-client/atreides");
const persona_1 = require("../diplomat/http-client/persona");
const odyssey_1 = require("../diplomat/http-client/odyssey");
const me_1 = require("../adapters/me");
async function getMe(userId, token) {
    const [user, student] = await Promise.all([
        (0, atreides_1.getUser)(userId, token),
        (0, persona_1.getStudentByUser)(userId, token),
    ]);
    const journey = student ? await (0, odyssey_1.getJourneyByStudent)(student.id, token) : null;
    return (0, me_1.toMe)(user, student, journey);
}
