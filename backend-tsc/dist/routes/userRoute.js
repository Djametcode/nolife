"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
const multer_1 = require("../middleware/multer");
router.post('/regist', userController_1.createUser);
router.post('/login', userController_1.loginUser);
router.get('/all-user', userController_1.getAllUser);
router.patch('/update-user/:id', auth_1.authMiddleware, multer_1.upload, userController_1.updateUser);
exports.userRouter = router;
