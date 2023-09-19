"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const diskStorage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, '/tmp');
    },
    filename(req, file, callback) {
        callback(null, file.originalname + '-' + Date.now());
    },
});
exports.upload = (0, multer_1.default)({ storage: diskStorage }).single('file');
