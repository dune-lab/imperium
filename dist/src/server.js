"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@enxoval/http");
const app_1 = require("./app");
const PORT = Number(process.env.PORT) || 3004;
const HOST = process.env.HOST || '0.0.0.0';
(0, app_1.buildApp)();
(0, http_1.listen)(PORT, HOST).catch((err) => {
    console.error('Failed to start:', err);
    process.exit(1);
});
