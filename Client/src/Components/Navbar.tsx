import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth/AuthContext";

export const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    logout();
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/myProfile")
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handelLogNav = () => {
    navigate("/login");
  };
  const handelRegNav = () => {
    navigate("/register");
  };
  const handelHomeNav = () => {
    navigate("/");
  };
  const goCraete = () => {
    navigate("/create")
  }
  const { isAuth, logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handelHomeNav}
          >
            Blogify Hub
          </Typography>

          {isAuth ? (
            <div>
              <Button variant="contained" color="secondary" onClick={goCraete} sx={{mr:5}}>Create Post</Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handelLogNav}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handelRegNav}
                sx={{ marginX: 2 }}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
