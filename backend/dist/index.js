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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./config/db");
const user_model_1 = __importDefault(require("./models/user.model"));
const AuthMiddleware_1 = require("./middleware/AuthMiddleware");
const contents_model_1 = __importDefault(require("./models/contents.model"));
const uuid_1 = require("uuid");
const links_model_1 = __importDefault(require("./models/links.model"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Bcrypt
    const signUpSchema = zod_1.z.object({
        username: zod_1.z.string().min(6, "Username must be at least 6 characters long"),
        password: zod_1.z.string().min(20, "Password must be at least 20 characters long"),
    });
    try {
        signUpSchema.parse(req.body);
    }
    catch (error) {
        const err = error;
        return res.status(400).json({
            message: err.message
        });
    }
    const { username, password } = req.body;
    if (!username) {
        return res.status(411).json({
            message: "username is required"
        });
    }
    if (!password) {
        return res.status(411).json({
            message: "password is required"
        });
    }
    try {
        const existingUser = yield user_model_1.default.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                message: "username is already exits"
            });
        }
        yield user_model_1.default.create({
            username,
            password
        });
        return res.status(200).json({
            message: "User created successfully"
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username) {
        return res.status(411).json({
            message: "username is required"
        });
    }
    if (!password) {
        return res.status(411).json({
            message: "password is required"
        });
    }
    try {
        const existingUser = yield user_model_1.default.findOne({ username, password });
        if (!existingUser) {
            return res.status(404).json({
                message: "user is not registereed"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET);
        return res.status(200).json({
            message: "User login successfully",
            token
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
    ;
}));
// Create content
app.post("/api/v1/content", AuthMiddleware_1.userAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, type } = req.body;
    if (!title) {
        return res.status(411).json({
            message: "Title is required"
        });
    }
    if (!link) {
        return res.status(411).json({
            message: "link is required"
        });
    }
    if (!type) {
        return res.status(411).json({
            message: "type should be 'image', 'video', 'article', 'audio'"
        });
    }
    try {
        const contents = yield contents_model_1.default.create({
            title,
            type,
            link,
            // @ts-ignore
            userId: req.userId,
            tags: []
        });
        return res.status(200).json({
            message: "Content created successfully",
            contents
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}));
// get content
app.get("/api/v1/content", AuthMiddleware_1.userAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    try {
        const content = yield contents_model_1.default.find({
            userId
        }).populate("userId", "username");
        if (!content) {
            return res.status(404).json({
                message: "Unable to find the content"
            });
        }
        ;
        return res.status(200).json({
            message: "content find successfully",
            content
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}));
// delete content
app.delete("/api/v1/content", AuthMiddleware_1.userAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    try {
        if (!contentId) {
            return res.status(411).json({
                message: "Content Id is required"
            });
        }
        const result = yield contents_model_1.default.deleteOne({
            _id: contentId,
            // @ts-ignore
            userId: req.userId
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Content not found or not authorized to delete",
            });
        }
        return res.status(200).json({
            message: "Content deleted successfully",
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}));
// share brain link
app.post("/api/v1/brain/share", AuthMiddleware_1.userAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shareLink = req.body.shareLink;
    try {
        // @ts-ignore
        const userId = req.userId;
        if (shareLink) {
            const hash = (0, uuid_1.v4)();
            yield links_model_1.default.create({
                hash,
                userId
            });
            return res.status(201).json({
                message: "Brain link shared successfully",
                shareId: hash,
                link: `/api/v1/brain/${hash}`,
            });
        }
        else {
            const result = yield links_model_1.default.findOneAndDelete({
                userId,
            });
            if (!result) {
                return res.status(404).json({
                    message: "No shared link found to delete",
                });
            }
            return res.status(200).json({
                message: "Brain link deleted successfully",
            });
        }
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}));
// get contents from the link
app.get("/api/v1/brain/:shareId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareId;
    try {
        const link = yield links_model_1.default.findOne({ hash });
        if (!link) {
            res.status(409).json({
                message: "Sorry, incorrect Link"
            });
            return;
        }
        const content = yield contents_model_1.default.findOne({
            userId: link.userId
        });
        const user = yield user_model_1.default.findOne({
            _id: link.userId
        });
        return res.status(200).json({
            username: user === null || user === void 0 ? void 0 : user.username,
            content
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    console.log(`app listens on ${port}`);
}));
