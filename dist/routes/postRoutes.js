"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const postController_1 = require("../controller/postController");
const auth_1 = __importDefault(require("../middleware/auth"));
const multer_1 = require("../middleware/multer");
router.post('/create-post', auth_1.default, multer_1.upload, postController_1.createPost);
router.patch('/update-post/:id', auth_1.default, postController_1.updatePost);
exports.postRoute = router;
