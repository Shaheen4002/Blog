import postModel from "./posts.model";


export const getAllPosts = async() => {
    const posts = await postModel.find();
    return { data : posts , statusCode : 200}
}

export const getSinglePost = async({id} : any) => {
    const post = await postModel.findById(id).populate("userId", "username");
    if(!post){
        return {data : "post not found" , statusCode : 400}
    }
    return {data : post , statusCode : 200}
}

interface postData{
    userId : string,
    title : string,
    description : string,
    content : string,
    image? : string,
}

export const createPost = async({ userId, title , description , content , image} : postData) => {
    const newPost = await postModel.create({userId, title, description, content, image});
    if(!newPost){
        return {data : "failed to add the post you may added wrong data" , statusCode : 400}
    }
    await newPost.save();
    return {data : newPost , statusCode : 200}
}

export const deletePost = async(id : string) => {
    const post = await postModel.findByIdAndDelete(id);
    if(!post){
        return {data : "post not found" , statusCode : 404}
    }
    return {data : post , statusCode : 200}
}

interface editData{
    id : string,
    title : string,
    description : string,
    content : string,
    image? : string,
}

export const editPost = async({id , title , description , content } : editData) => {
    const updatedPost = await postModel.findByIdAndUpdate(id , {title , description , content } , {new : true})
    if(!updatedPost){
        return {data : "post not found" , statusCode : 404}
    }
    await updatedPost.save();
    return { data : updatedPost , statusCode : 200}
}