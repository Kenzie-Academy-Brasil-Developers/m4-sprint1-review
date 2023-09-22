import { Request, Response, NextFunction } from "express";
import { usersDatabase } from "../database";

export const isUserIdValid = (req: Request, res: Response, next: NextFunction) => {
    const id = +req.params.id;

    if(!usersDatabase.some(user => user.id === id)){
        return res.status(404).json({ errors: "Not found any user with this id"})
    }

    next();
}