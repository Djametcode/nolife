"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloud = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const env_1 = require("../env");
exports.cloud = cloudinary_1.default.v2.config({
    api_key: env_1.env.API_KEY,
    cloud_name: env_1.env.CLOUD_NAME,
    api_secret: env_1.env.API_SECRET
});
