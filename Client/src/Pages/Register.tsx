import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../Context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async () => {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !email || !password) {
      setError("check submited data");
      return;
    }

    const response = await fetch("http://localhost:3004/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.message || 'Something went wrong!');
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
  return (
    <>
      <Container  sx={{mb:16}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: 4,
          }}
        >
          <Typography variant="h5">Register new Account</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 4 }}>
            <TextField
              inputRef={usernameRef}
              label="username"
              name="username"
            />
            <TextField inputRef={emailRef} label="email" name="email" />
            <TextField
              inputRef={passwordRef}
              label="password"
              name="password"
              type="password"
            />
            <Button variant="contained" onClick={onSubmit}>
              Register
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
