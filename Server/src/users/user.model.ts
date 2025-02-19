import mongoose , {Schema , Document} from "mongoose";

export interface IUser extends Document{
    username : string,
    password : string,
    email : string
}

const userSchema = new Schema<IUser>({
    username : { type : String , required : true},
    password : { type : String , required : true},
    email : { type : String , required : true},
})

const userModel = mongoose.model<IUser>("User" , userSchema);

export default userModel;