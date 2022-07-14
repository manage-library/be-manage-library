"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
class HttpExceptionFilter {
    catch(err, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(err?.status || 500).json({
            statusCode: err?.status || 500,
            status: false,
            context: err.response?.context,
            message: err.response?.message || err.message,
        });
    }
}
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map