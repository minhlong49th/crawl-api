"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () {
    var _a, _b, _c, _d, _e, _f;
    return ({
        port: parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000', 10),
        database: {
            host: process.env.DATABASE_HOST || 'localhost',
            port: parseInt((_b = process.env.DATABASE_PORT) !== null && _b !== void 0 ? _b : '5432', 10),
            username: process.env.DATABASE_USER || 'crawl_user',
            password: process.env.DATABASE_PASSWORD || 'crawl_password',
            database: process.env.DATABASE_NAME || 'crawl_db',
        },
        redis: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt((_c = process.env.REDIS_PORT) !== null && _c !== void 0 ? _c : '6379', 10),
        },
        crawler: {
            maxRetries: parseInt((_d = process.env.CRAWLER_MAX_RETRIES) !== null && _d !== void 0 ? _d : '3', 10),
            timeout: parseInt((_e = process.env.CRAWLER_TIMEOUT) !== null && _e !== void 0 ? _e : '30000', 10),
            concurrency: parseInt((_f = process.env.CRAWLER_CONCURRENCY) !== null && _f !== void 0 ? _f : '1', 10),
        },
        auth: {
            uppromote: {
                email: process.env.UPPROMOTE_EMAIL || 'minhlong49th@gmail.com',
                password: process.env.UPPROMOTE_PASSWORD || 'd>Tj:d0Y5(2y',
            },
        },
    });
});
