"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMeRoutes = registerMeRoutes;
const http_1 = require("@enxoval/http");
const auth_1 = require("@enxoval/auth");
const types_1 = require("@enxoval/types");
const me_1 = require("../../controllers/me");
function registerMeRoutes() {
    (0, http_1.getWithAuth)('/me', async (authorization) => {
        const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;
        if (!token)
            throw new types_1.UnauthorizedError('Unauthorized');
        const payload = (0, auth_1.decodeToken)(token);
        if (!payload)
            throw new types_1.UnauthorizedError('Unauthorized');
        return (0, me_1.getMe)(payload.userId, token);
    });
}
