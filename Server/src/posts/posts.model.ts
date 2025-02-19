import mongoose , {Schema , Document, ObjectId} from "mongoose";

export interface IPost extends Document{
    userId : ObjectId | string,
    title : string,
    description : string,
    content : string,
    likes : number,
    image : string,
}

const postSchema = new Schema<IPost>({
    userId : {type : Schema.Types.ObjectId , ref : "User" , required : true},
    title : {type : String , required : true},
    description : {type : String , required : true},
    content : {type : String , required : true},
    likes : {type : Number , default : 0},
    image : {type : String },
},{
    timestamps : true
})

const postModel = mongoose.model<IPost>("Post" , postSchema)

export default postModel;