import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./users/user.route";
import path from 'path';
import postRouter from "./posts/posts.route";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3004;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
.connect(process.env.DATABASE_URL || '')
.then(() => console.log("connected to data base"))
.catch((err) => console.log("failed to connect to the data base " + err))

app.use("/users" , userRouter);
app.use("/posts" , postRouter);

app.listen(port , () => {
    console.log(`server running at port ${port}`);
});