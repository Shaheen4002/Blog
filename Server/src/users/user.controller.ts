import userModel from "./user.model";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import postModel from "../posts/posts.model";
import { Types } from 'mongoose';

interface RegisterData{
    username : string,
    password : string,
    email : string
}

export const register = async({username , password , email} : RegisterData) => {
    
    const findUser = await userModel.findOne({email : email});
    if(findUser){
        return {data :"user already exists..." , statusCode : 400}
    }
    const hashedpassword = await bcrypt.hash(password , 10);
    const newUser = new userModel({
        username : username,
        password : hashedpassword,
        email : email
    })
    await newUser.save();
    return {data : generatejwt({username : username , email : email} ), statusCode : 200}
}

interface LoginData{
    username : string,
    password : string
}


export const login = async({username , password} : LoginData) => {

    const findUser = await userModel.findOne({username : username})
    if(!findUser){
        return{data:"incorrect username or password" , statusCode : 400}
    }
    const passwordMatch = await bcrypt.compare(password , findUser?.password)
    if(passwordMatch){
        return {data : generatejwt({username : username , email : findUser.email}) , statusCode : 200}
    }else{
        return{data:"incorrect username or password" , statusCode : 400}
    }

}


export const getUserProfile = async({userId} : {userId : string | Object}) => {
    const user = await userModel.findById(userId);
    if (!user) {
        return { data: "User profile not found", statusCode: 404 };
    }
    const userPosts = await postModel.find({userId : user._id});
    const userProfileWithPosts = {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            // Add more user profile properties as needed
        },
        posts: userPosts,
    };

    return { data: userProfileWithPosts, statusCode: 200 };
}


export const getMyProfile = async({id} :{id:string| Object} ) => {
    const currentUser = await userModel.findById(id);
    if (!currentUser) {
        return { data: "Your profile not found", statusCode: 404 };
    }
    const myPosts = await postModel.find({userId : currentUser._id});
    const myProfile = {
        currentUser : {
            id : currentUser._id,
            username : currentUser.username,
            email : currentUser.email
        },
        posts : myPosts
    };
    return { data: myProfile, statusCode: 200 };
}



const generatejwt = (data : any) => {
    return jwt.sign(data ,  process.env.JWT_SECRET || '')
}