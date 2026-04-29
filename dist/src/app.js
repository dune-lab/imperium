"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const me_1 = require("./diplomat/http-server/me");
function buildApp() {
    (0, me_1.registerMeRoutes)();
}
