"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const postController_1 = require("../controller/postController");
const multer_1 = require("../middleware/multer");
router.post('/create-post', multer_1.upload, postController_1.createPost);
router.delete('/delete-post/:id', postController_1.deletePost);
router.get('/get-all-post', postController_1.getAllPost);
router.patch('/update-post/:id', multer_1.upload, postController_1.updatePost);
router.post('/like-post/:id', postController_1.likePost);
router.delete('/unlike/:id', postController_1.unLikeController);
exports.PostRouter = router;
