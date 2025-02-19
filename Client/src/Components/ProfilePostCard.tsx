import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface postCardData {
  id: string;
  image: string;
  title: string;
  description: string;
  onDeletePost: (id: string) => void;
}
export function ProfilePostCard({
  id,
  image,
  title,
  description,
  onDeletePost,
}: postCardData) {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem("token");
  const goToPost = () => {
    navigate(`/posts/${id}`);
  };
  const Delete = async () => {
    try {
      const response = await fetch(`http://localhost:3004/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Handle error responses from the server
        const errorData = await response.json();
        setError(
          errorData.message || "An error occurred while deleting the post."
        );
        alert(error);
      } else {
        onDeletePost(id);
      }
    } catch (err) {
      setError("An error occurred while deleting the post." + err);
    }
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          minWidth: "30%",
          margin: "10px",
          boxShadow: 15,
          position: "relative",
          hight: "100%",
          top: 0,
        }}
      >
        <CardActionArea sx={{ minHeight: "85%" }}>
          <CardMedia
            component="img"
            height="140"
            image={`/public/${image}`}
            alt="post photo not found"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description.slice(0, 100)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" variant="contained" onClick={goToPost}>
            Read More
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "rgb(231, 77, 77)" }}
            onClick={Delete}
          >
            Delete
          </Button>
          <Button
           size="small" 
           variant="contained" 
           color="secondary"
           onClick={() => {navigate(`/posts/edit/${id}`)}}
           >
            Edit Post
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
