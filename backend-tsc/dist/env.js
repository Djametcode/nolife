"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    MONGO_URL: zod_1.z.string().nonempty(),
    JWT_SECRET: zod_1.z.string().nonempty(),
    JWT_TIMES: zod_1.z.string().nonempty(),
    CLOUD_NAME: zod_1.z.string().nonempty(),
    API_KEY: zod_1.z.string().nonempty(),
    API_SECRET: zod_1.z.string().nonempty(),
});
exports.env = envSchema.parse(process.env);
