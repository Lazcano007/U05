import {Request, Response} from "express";
import { UserData } from "../Interface/users";



//DUMMY DATA
let users: UserData[] = [
    {id: 1, name:"Pedro", email: "Pedro@me.com", password: "hejhej"}];




// Detta hämtar DATA från DB (i detta fall användare)
export const getUser = (req: Request, res: Response) => {
    res.json(users)
}

// Detta uppdaterar DATA i DB (i detta fall användare)
export const getUserById = (req: Request, res: Response) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) {
        res.status(404).json({ message: "This user is not found"});
        return;
    }
    res.json(user);
}

// Detta lägger till DATA i DB (i detta fall användare)
export const createUser = (req: Request, res: Response) => {
    if (!req.body.name || req.body.email || req.body.password  === undefined) {       //Kollar om name, email och password finns
        res.status(400).json({message: "Name, email and password is required"});
        return;
    }
    const newUser: UserData = {
        id: users.length + 1,    // unikt id för user i DB
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    users.push(newUser);
    res.status(201).json(newUser);
}

// Detta uppdaterar DATA i DB (i detta fall användaren)
export const updateUser = (req: Request, res: Response) => {
    const userIndex = users.findIndex (u => u.id === parseInt(req.params.id));    //(req.param.id) =hämtar index för användaren som ska uppdateras
    if(userIndex === -1) {                                                        //parseInt(req.params.id) omvandlar id från string till int                                           
    res.status(404).json({message: "This account is not found"});    
    return;
    }
    users[userIndex] = { ...users[userIndex], ...req.body};                       // (...) = uppdaterar användaren utan att skriva över hela objektet
    res.json({message: "Your account has been successfully updated", user: users[userIndex]});   //(user: users[userIndex) = visar vilket användare som uppdateras
}

// Detta tar bort DATA i DB (i detta fall användaren)
export const deleteUser = (req: Request, res: Response) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: "This account is not found" });
    }
    users.splice(userIndex, 1);
    res.json({ message: "Your account has been successfully deleted" });
};

