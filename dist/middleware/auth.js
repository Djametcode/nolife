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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const HeaderCheck = req.headers.authorization;
    if (!(HeaderCheck === null || HeaderCheck === void 0 ? void 0 : HeaderCheck.startsWith('Bearer ')) || !HeaderCheck) {
        return res.status(401).json({ msg: 'Please login First' });
    }
    const token = HeaderCheck.split(" ")[1];
    try {
        const data = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!data) {
            return res.status(401).json({ msg: 'Token Error Please Login Again' });
        }
        req.user = { userId: data.userId, username: data.username, email: data.email };
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = authUser;
