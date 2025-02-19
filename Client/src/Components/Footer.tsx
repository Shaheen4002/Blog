import { Box, Typography } from "@mui/material"


const Footer = () => {
  return (
    <Box
    sx={{
      backgroundColor: (theme) => theme.palette.primary.dark,  
      color: "#fff", 
      textAlign: "center",
      py: 2,
      mt:4,
      bottom:0
    }}
  >
    <Typography>
      Blogify Hub 2025 all rights reserved
    </Typography>
  </Box>
  )
}

export default Footer