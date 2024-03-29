import { NextFunction, Request, Response } from "express";
import { IPayload } from "../interfaces";
import { verify } from "jsonwebtoken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(' ');


    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET,
        ) as IPayload;

        req.user_id = sub;

        next();
    } catch (error) {
        res.status(401).end();
    }


}