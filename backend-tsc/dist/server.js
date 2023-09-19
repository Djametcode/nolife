"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./db/db"));
const userRoute_1 = require("./routes/userRoute");
const postRoute_1 = require("./routes/postRoute");
const cloudinary_1 = require("cloudinary");
const env_1 = require("./env");
cloudinary_1.v2.config({
    api_key: env_1.env.API_KEY,
    api_secret: env_1.env.API_SECRET,
    cloud_name: env_1.env.CLOUD_NAME
});
//middleware
const auth_1 = require("./middleware/auth");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/v14/no-life/auth', userRoute_1.userRouter);
app.use('/api/v14/no-life/post', auth_1.authMiddleware, postRoute_1.PostRouter);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.MONGO_URL) {
            throw Error('Missing env');
        }
        yield (0, db_1.default)(process.env.MONGO_URL);
        app.listen(3000, () => console.log(`Server running on port 3000`));
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
