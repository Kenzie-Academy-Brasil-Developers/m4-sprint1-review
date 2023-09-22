import { Request, Response } from "express";
import { usersDatabase } from "./database";
import { IUser } from "./interfaces";


export const getUsers = (req: Request, res: Response) => {
    return res.status(200).json(usersDatabase);
    // REQ = headers, body, params, query
}

export const getOneUsers = (req: Request, res: Response) => {
    const id = +req.params.id;

    const user = usersDatabase.find(user => user.id === id);

    return res.status(200).json(user);
}

let id = 1;

export const createUser = (req: Request, res: Response) => {
    const date = new Date();
    // const oneYear = 365 * 24 * 60 * 60 * 1000;
    //const year = date.getFullYear();
    //const isLeapYear = !(year % 4);
    // date.setDate(date.getDate() + 365);
    // date.setFullYear(date.getFullYear() + 1);

    const newUser: IUser = {
        id,
        name: req.body.name,
        email: req.body.email,
        createdAt: date,
        updatedAt: date,        
    }

    usersDatabase.push(newUser);

    id++;

    return res.status(201).json({ message: "User sucessfully created", user: newUser});
}

export const deleteUser = (req: Request, res: Response) => {
    const id = +req.params.id;

    const index = usersDatabase.findIndex(user => user.id === id);

    usersDatabase.splice(index, 1);

    res.status(200).json({ message: "User deleted sucessfully."});
}

export const updateUser = (req: Request, res: Response) => {
    const id = +req.params.id;

    const user = usersDatabase.find(user => user.id === id);

    let updateData: Partial<Omit<IUser, 'id' | 'createdAt'>> = {};

    Object.entries(req.body).forEach(([key, value]) => {
        if(key === "name" || key === "email"){
            updateData[key] = value as string; 
        } 
    });   

    const date = new Date();
    
    const newUser = { ...user, ...updateData, updatedAt: date } as IUser;

    const index = usersDatabase.findIndex(user => user.id === id);

    usersDatabase.splice(index, 1, newUser);

    res.status(200).json(newUser);
}