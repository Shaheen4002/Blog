import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../users/user.model";

export interface ExtendRequest extends Request{
    user?: any;
}

const validatejwt = (req : ExtendRequest , res : Response , next : NextFunction) => {
    const authorizationHeader = req.get('authorization');
    if(!authorizationHeader){
        res.status(403).send("Authorization Header was not provided");
        return;
    }
    const bearerToken = authorizationHeader.split(" ");
    const token = bearerToken[1];
    if(!token){
        res.status(403).send("Bearer token not found");
        return;
    }

    // payload is the data that i send it when i signed the token in the user controller
    jwt.verify(token , process.env.JWT_SECRET || '' , async(err , payload) => {
        if(err){
            res.status(403).send("invalid token")
            return;
        }
        if(!payload){
            res.status(403).send("invalid token payload")
        }

        const userPayload = payload as {username : string , email : string};
        const user = await userModel.findOne({email : userPayload.email});
        req.user = user;
        next();
    })
}


export default validatejwt;