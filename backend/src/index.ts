import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { z } from "zod"
import jwt from "jsonwebtoken"
import { connectDB } from "./config/db";
import userModel from "./models/user.model";
import { userAuthMiddleware } from "./middleware/AuthMiddleware";
import contentsModel from "./models/contents.model";
import { v4 as uuidv4 } from "uuid";
import linksModel from "./models/links.model";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());


app.post("/api/v1/signup", async (req: Request, res: Response): Promise<any> => {

    // TODO: Bcrypt

    const signUpSchema = z.object({
        username: z.string().min(6, "Username must be at least 6 characters long"),
        password: z.string().min(20, "Password must be at least 20 characters long"),
    });

    try {
        signUpSchema.parse(req.body);
    } catch (error) {
        const err = error as Error;
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

        const existingUser = await userModel.findOne({ username });

        if (existingUser) {
            return res.status(409).json({
                message: "username is already exits"
            })
        }

        await userModel.create({
            username,
            password
        });

        return res.status(200).json({
            message: "User created successfully"
        });

    } catch (err) {
        const error = err as Error;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }

});

app.post("/api/v1/signin", async (req: Request, res: Response): Promise<any> => {

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

        const existingUser = await userModel.findOne({ username, password });

        if (!existingUser) {
            return res.status(404).json({
                message: "user is not registereed"
            });
        }

        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET as string);

        return res.status(200).json({
            message: "User login successfully",
            token
        });


    } catch (err) {

        const error = err as Error;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    };

});

// Create content
app.post("/api/v1/content", userAuthMiddleware, async (req: Request, res: Response): Promise<any> => {

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

        const contents = await contentsModel.create({
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

    } catch (err) {
        const error = err as Error;

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }
});

// get content
app.get("/api/v1/content", userAuthMiddleware, async (req: Request, res: Response): Promise<any> => {

    // @ts-ignore
    const userId = req.userId;
    try {

        const content = await contentsModel.find({
            userId
        }).populate("userId", "username");

        if (!content) {
            return res.status(404).json({
                message: "Unable to find the content"

            });
        };

        return res.status(200).json({
            message: "content find successfully",
            content
        });

    } catch (err) {
        const error = err as Error;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }

});

// delete content
app.delete("/api/v1/content", userAuthMiddleware, async (req: Request, res: Response): Promise<any> => {

    const contentId = req.body.contentId;

    try {

        if (!contentId) {
            return res.status(411).json({
                message: "Content Id is required"
            });
        }

        const result = await contentsModel.deleteOne({
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

    } catch (err) {
        const error = err as Error;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }

});

// share brain link
app.post("/api/v1/brain/share", userAuthMiddleware, async (req: Request, res: Response): Promise<any> => {

    const shareLink = req.body.shareLink;

    try {

        // @ts-ignore
        const userId = req.userId;

        if (shareLink) {

            const hash = uuidv4();
            await linksModel.create({
                hash,
                userId
            });

            return res.status(201).json({
                message: "Brain link shared successfully",
                shareId: hash,
                link: `/api/v1/brain/${hash}`,
            });

        } else {

            const result = await linksModel.findOneAndDelete({
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

    } catch (err) {
        const error = err as Error;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }

});

// get contents from the link
app.get("/api/v1/brain/:shareId", async (req: Request, res: Response): Promise<any> => {

    const hash = req.params.shareId;

    try {

        const link = await linksModel.findOne({ hash });

        if (!link) {
            res.status(409).json({
                message: "Sorry, incorrect Link"
            });
            return;
        }

        const content = await contentsModel.findOne({

            userId: link.userId
        });

        const user = await userModel.findOne({
            _id: link.userId

        });

        return res.status(200).json({
            username: user?.username,
            content
        });

    } catch (err) {
        const error = err as Error;
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });


    }

});


app.listen(port, async () => {
    await connectDB();
    console.log(`app listens on ${port}`);
});