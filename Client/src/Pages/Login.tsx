import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../Context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("check submited data");
      return;
    }

    const response = await fetch("http://localhost:3004/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to login try again");
      return;
    }
    const token = await response.json();
    if (!token) {
      setError("incorrect token");
      return;
    }
    login(username, token);
    navigate("/");
  };
  const toRegister = () => {
    navigate("/register")
  }

  return (
    <>
      <Container sx={{mb:18}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: 4,
          }}
        >
          <Typography variant="h5">Login to your Account</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 4 }}>
            <TextField
              inputRef={usernameRef}
              label="username"
              name="username"
            />
            <TextField
              inputRef={passwordRef}
              label="password"
              name="password"
              type="password"
            />
            <Button variant="contained" onClick={onSubmit}>
              Login
            </Button>
            <Button variant="outlined" onClick={toRegister}>
              Do not have account ?
            </Button>
            {error && (
              <Typography sx={{ color: "red", textAlign: "center" }}>
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};
