import  express,{Request , Response}  from "express";
import { createPost , deletePost , editPost, getAllPosts, getSinglePost} from "./posts.controller";
import validatejwt from "../middleware/validateJWT";
import { ExtendRequest } from "../middleware/validateJWT";
import postModel from "./posts.model";
import upload from "../middleware/multer";
import path from "path";

const postRouter = express.Router();

postRouter.get("/" , async(req , res) => {
    try {
        const result = await getAllPosts();
        res.status(result.statusCode).json(result.data)
    } catch (error) {
        res.status(500).send(error);
    }    
})

postRouter.get("/:id" , async(req , res) => {
    try {
        const {id} = req.params;
        const result = await getSinglePost({id:id});
        res.status(result.statusCode).json(result.data)
    } catch (error) {
        res.status(500).send(error);
    }
})

postRouter.post("/create", validatejwt, upload.single("image") ,async(req :ExtendRequest , res : Response) => {
    try {
        const userId = req.user?._id;
        const { title , description , content} = req.body;
        const image = req.file ? path.basename(req.file.path) : undefined;
        const result = await createPost({userId, title , description , content , image});
        res.status(result.statusCode).json(result.data)
    } catch (error) {
        res.status(500).send(error);
    }
})

postRouter.delete("/:id" , validatejwt , async(req :ExtendRequest , res : Response): Promise<void> => {
    try {
        const id = req.params.id;
        const userId = req.user?._id;
        const post = await postModel.findById(id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        if (post && post.userId.toString() !== userId.toString()) {
            res.status(403).json({ message: "You are not authorized to delete this post" });
            return;
        }
        const result = await deletePost(id);
         res.status(result.statusCode).json(result.data);
    } catch (error) {
        res.status(500).send(error);
    }
})

postRouter.put("/edit/:id" , validatejwt, upload.single("image") ,async(req :ExtendRequest , res : Response):Promise<void> => {
    try {
        const id = req.params.id;
        const userId = req.user?._id;
        const { title , description , content} = req.body;
        //const image = req.file?.path;
        const post = await postModel.findById(id);
        if (!post) {
             res.status(404).json({ message: "Post not found" }); 
             return;
        }

        if (post && post.userId.toString() !== userId.toString()) {
             res.status(403).json({ message: "You are not authorized to edit this post" });
             return;
        }
        const result = await editPost({id, title , description , content })
        res.status(result.statusCode).json(result.data)
    } catch (error) {
        res.status(500).send(error);
    }
})

export default postRouter;