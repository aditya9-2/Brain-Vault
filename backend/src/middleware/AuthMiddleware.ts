import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const userAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {

    try {
        // const token = req.headers.authorization?.split(" ")[1];
        const token = req.headers["authorization"];

        if (!token) {
            res.status(403).json({
                message: "No token provided"
            });
            return;
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);
        // @ts-ignore
        req.userId = decodedData.id;

        next();

    } catch (err) {
        const error = err as Error;
        res.status(401).json({
            message: "Unauthorized",
            error: error.message
        });
    }
};