"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PingFederateError extends Error {
    constructor(message, reason) {
        super();
        this.message = message;
        this.reason = reason;
    }
}
exports.PingFederateError = PingFederateError;
//# sourceMappingURL=error.js.map