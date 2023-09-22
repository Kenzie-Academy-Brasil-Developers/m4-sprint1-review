import { NextFunction, Request, Response } from "express";

export const isUserBodyValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = [];

    if(!req.body.name){
        errors.push("name is required");
    }

    if(!req.body.email){
        errors.push("email is required");
    }

    if(errors.length > 0){
        return res.status(422).json({ errors: errors })
    }

    next();
}