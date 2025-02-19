import  express,{Request , Response}  from "express";
import { register , login, getUserProfile, getMyProfile } from "./user.controller";
import validatejwt from "../middleware/validateJWT";
import { ExtendRequest } from "../middleware/validateJWT";
import { Types } from 'mongoose';

const userRouter = express.Router();

userRouter.post("/register" , async(req , res) => {
    try {
        const {username , password , email} = req.body;
        const result = await register({username , password , email});
        res.status(result.statusCode).json(result?.data)
    } catch (error) {
        res.status(500).send(error);
    }
});
userRouter.post("/login" , async(req , res) => {
    try {
        const {username , password} = req.body;
        const result = await login({username , password});
        res.status(result.statusCode).json(result?.data)
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.get("/:id" , validatejwt ,async(req :ExtendRequest , res : Response) => {
    try {
        const {id} = req.params;
        const result = await getUserProfile({userId : id});
        res.status(result.statusCode).json(result?.data)
    } catch (error) {
        res.status(500).send(error);
    }
})
userRouter.get("/" , validatejwt ,async(req :ExtendRequest , res : Response)  => {
    try {
        const id = req.user?._id;
        const result = await getMyProfile({id});
        res.status(result.statusCode).json(result?.data)
    } catch (error) {
        res.status(500).send(error);
    }
})


export default userRouter;