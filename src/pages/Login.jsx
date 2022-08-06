import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "web-firebase";
import { useSelector } from "react-redux";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import useBlog from "../hooks/useBlog";
import useToastify from "../hooks/useToastify";
const theme = createTheme();

const Login = () => {
  const { Toastify } = useToastify();
  const auth = useSelector((state) => state.auth.auth);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { signIn, googleAuth, error } = useAuth(auth);
  const navigate = useNavigate();
  const { getData } = useBlog();

  const checkError = () => {
    Toastify("error", error?.message);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    signIn(email, password);
    getData();
  };
  useEffect(() => {
    checkError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    userInfo && Toastify("success", "Logged In Successfully");
    userInfo && navigate("/");
  }, [userInfo, navigate, Toastify]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={() => googleAuth(navigate)}
            >
              Sign in with Google
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkRouter to={"/setting"}>Forgot password?</LinkRouter>
              </Grid>
              <Grid item>
                <LinkRouter to={"/register"}>
                  Don't have an account? Sign Up
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Login;
