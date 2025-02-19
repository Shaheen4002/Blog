import {
  Box,
  Button,
  CardMedia,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface post {
  userId: object | string;
  title: string;
  description: string;
  content: string;
  image?: string | undefined;
}
const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(`http://localhost:3004/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };
    fetching();
  }, [id]);

  if (!post) {
    return <Typography>Loading...</Typography>;
  }

  const goHome = () => {
    navigate("/");
  };
  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={20} sx={{ padding: "15px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "rgb(74, 74, 255)" }}
          >
            {post.title}
          </Typography>
          <Link
            to={`/users/${post.userId._id}`}
            style={{ textDecoration: "none" }}
          >
            <Typography variant="h6" sx={{ color: "rgb(74, 74, 255)" }}>
              {post.userId.username}
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 4 }}>
          <CardMedia
            component="img"
            height="400"
            image={`/public/${post.image}`}
          />
          <Typography>{post.content}</Typography>
        </Box>
        <Button onClick={goHome} variant="contained" sx={{ mt: 4 }}>
          Back to Home Page
        </Button>
      </Paper>
    </Container>
  );
};

export default SinglePost;
