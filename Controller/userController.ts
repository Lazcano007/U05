import {Request, Response} from "express";
import { UserData } from "../Interface/users";




let users: UserData[] = [
    {id: 1, name:"Pedro", email: "Pedro@me.com", password: "hejhej"}];



// Detta lägger till DATA i DB (i detta fall djuren)
export const createUser = (req: Request, res: Response) => {
    const newUser: UserData = {
        id: users.length + 1,    // unikt id för user i DB
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    users.push(newUser);
    res.status(201).json(newUser);
}


export const getUserById = (req: Request, res: Response) => {
    const user = users.find((nextusers) => nextusers.id === parseInt(req.params.id));
    if(!users) {
        res.status(404).json({ message: "This pet is not found"});
        return;
    }
    res.json(users);
}


export const getUser = (req: Request, res: Response) => {
    res.json(users)
}

