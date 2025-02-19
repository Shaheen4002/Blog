import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";

interface postCardData {
  id: string;
  image: string;
  title: string;
  description: string;
}
export function PostCard({ id, image, title, description }: postCardData) {
  const navigate = useNavigate();
  const goToPost = () => {
    navigate(`/posts/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 345, minWidth: "30%" ,margin: "10px", boxShadow: 15 , position : "relative",hight:"100%",top:0 }}>
      <CardActionArea sx={{minHeight:"85%"}}>
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
          
            {description.slice(0,100)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" onClick={goToPost} >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}
