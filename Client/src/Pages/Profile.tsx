import { Box, Container, Grid2, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostCard } from "../Components/PostCard";

const Profile = () => {
  interface Post {
    image: string;
    title: string;
    description: string;
    _id: string;
  }

  interface UserInfo {
    username: string;
    email: string;
    // Add any other properties here if needed
  }

  const { id } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [info, setInfo] = useState<UserInfo>({});

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(`http://localhost:3004/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setPosts(data.posts);
      setInfo(data.user);
    };
    fetching();
  }, [id]);

  if (!info) {
    return <Typography>Loading...</Typography>;
  }

  if (!posts) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ mt: 4, width: "100%" }}>
      <Paper elevation={20} sx={{ padding: "15px", width: "100%" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "rgb(74, 74, 255)",
            textAlign: "center",
            margin: 4,
          }}
        >
          {info.username} Profile
        </Typography>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "#fff",
            width: "25%",
            textAlign: "center",
            padding: 2,
            margin:"auto",
            borderRadius:"10px",
          }}
        >
          <Typography sx={{ mb: 1 ,fontSize:"20px"}}>username : {info.username}</Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" sx={{ textAlign: "center", margin: 2 }}>
            The posts that {info.username} created
          </Typography>
          <Grid2 container spacing={2}>
                {
                 posts.map(({_id , image , title , description}) => (
                   <PostCard image = {image}  title = {title}  description={description} id={_id}/>
                 ))
                }
                </Grid2>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
