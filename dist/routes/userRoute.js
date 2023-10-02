"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
const multer_1 = require("../middleware/multer");
const auth_1 = __importDefault(require("../middleware/auth"));
router.post('/regist-user', userController_1.registUser);
router.post('/login-user', userController_1.loginUser);
router.patch('/update-profile', auth_1.default, multer_1.upload, userController_1.updateProfile);
exports.userRouter = router;
