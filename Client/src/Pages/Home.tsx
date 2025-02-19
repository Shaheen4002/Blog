import { Box, Container, Grid2, Typography } from "@mui/material"
import {PostCard} from "../Components/PostCard"
import { useEffect, useState } from "react"
import Banner from "../Components/Banner";
import Profile from "./Profile";
import PostForm from "./CreatePost";
const Home = () => {

  interface post{
    _id : string,
    userId : string,
    title : string,
    description : string,
    content : string,
    image? : string | undefined,
  }
  const [posts , setPosts] = useState<post[]>([]);
  const [error , setError] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const response = await fetch("http://localhost:3004/posts");
        const data = await response.json();
        setPosts(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err : any) {
        setError(err);
      }
    }

    fetchPosts();
  },[])

  return ( 
    <>
    <Banner/>
    <Container sx={{ mt:2}}>
      <Typography variant="h6" sx={{ margin: 2, fontWeight: "bold", color: "rgb(74, 74, 255)" }}>The Posts that our users created</Typography>
       <Grid2 container spacing={2}>
       {
        posts.map(({_id , image , title , description}) => (
          <PostCard image = {image}  title = {title}  description={description} id={_id}/>
        ))
       }
       </Grid2>
       {error && <Typography sx={{ textAlign : "center"}}>{error}</Typography>}
    </Container>
     
    </>
  )
}

export default Home