import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { NextFunction } from "express";

const secretKey = process.env.JWT_SECRET || "secretkey";

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Access denied" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        (req as any).user = decoded;
        next();
    });
}
3;
