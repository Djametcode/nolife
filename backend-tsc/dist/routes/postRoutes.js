"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const postController_1 = require("../controller/postController");
router.post('/create-post', postController_1.createPost);
exports.postRoute = router;
