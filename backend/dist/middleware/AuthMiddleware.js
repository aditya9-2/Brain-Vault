"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuthMiddleware = (req, res, next) => {
    try {
        // const token = req.headers.authorization?.split(" ")[1];
        const token = req.headers["authorization"];
        if (!token) {
            res.status(403).json({
                message: "No token provided"
            });
            return;
        }
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.userId = decodedData.id;
        next();
    }
    catch (err) {
        const error = err;
        res.status(401).json({
            message: "Unauthorized",
            error: error.message
        });
    }
};
exports.userAuthMiddleware = userAuthMiddleware;
