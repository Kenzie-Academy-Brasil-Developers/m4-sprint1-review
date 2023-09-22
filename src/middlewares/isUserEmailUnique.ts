import { NextFunction, Request, Response } from "express";
import { usersDatabase } from "../database";

export const isUserEmailUnique = (req: Request, res: Response, next: NextFunction) => {
    if(usersDatabase.some(user => user.email === req.body.email)){
        return res.status(401).json({ errors: "This email is already registered." })
    }

    next();
}