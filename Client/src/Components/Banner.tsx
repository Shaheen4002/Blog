import { Box, CardMedia, Typography } from "@mui/material";

const Banner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 4,
        mt: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
        <Typography
          variant="h4"
          sx={{ margin: 2, fontWeight: "bold", color: "rgb(74, 74, 255)" }}
        >
          What is Blogify Hub ?
        </Typography>
        <Typography>
          Welcome to Blogify Hub, your ultimate destination for insightful
          articles and engaging stories! At Blogify Hub, we believe in the power
          of sharing ideas and connecting communities through the art of
          writing. Explore a diverse range of topics, from lifestyle and
          technology to travel and wellness, crafted by passionate writers. Join
          us on this journey, and let’s inspire each other with knowledge and
          creativity. Dive in and discover your next favorite read!
        </Typography>
      </Box>
      <CardMedia
        component="img"
        image="/src/assets/undraw_blog_1ca8.png"
        sx={{ width: { xs: "100%", sm: "50%" } }}
        alt = "error loading the image"
      />
    </Box>
  );
};

export default Banner;