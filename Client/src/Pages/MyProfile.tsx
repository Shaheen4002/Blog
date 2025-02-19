import { Box, Container, Grid2, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProfilePostCard } from "../Components/ProfilePostCard";

const MyProfile = () => {
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

      const [posts, setPosts] = useState<Post[]>([]);
      const [info, setInfo] = useState<UserInfo>({});
    
      useEffect(() => {
        const fetching = async () => {
          const response = await fetch(`http://localhost:3004/users`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          setPosts(data.posts);
          setInfo(data.currentUser);
        };
        fetching();
      },  []);
    
      if (!info) {
        return <Typography>Loading...</Typography>;
      }
    
      if (!posts) {
        return <Typography>Loading...</Typography>;
      }
    
      // Function to handle post deletion
      const handleDeletePost = (postId: string) => {
        // Remove the deleted post from the state
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      };
    
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
              <Typography sx={{fontSize:"20px"}}>email : {info.email}</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" sx={{ textAlign: "center", margin: 2 }}>
                The posts that {info.username} created
              </Typography>
              <Grid2 container spacing={2} sx={{ width: "100%" }}>
                {posts.map((post) => (
                  <ProfilePostCard
                    image={post.image}
                    title={post.title}
                    description={post.description}
                    id={post._id}
                    onDeletePost={handleDeletePost}
                  />
                ))}
              </Grid2>
            </Box>
          </Paper>
        </Container>
      );
    };

export default MyProfile