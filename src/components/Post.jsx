import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import PublishIcon from "@mui/icons-material/Publish";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useFirestore } from "web-firebase";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useBlog from "../hooks/useBlog";
import useToastify from "../hooks/useToastify";
const categories = ["general", "politics", "science", "sports", "technology"];
const theme = createTheme();
const Post = () => {
  const navigate = useNavigate();
  const { getData } = useBlog();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const db = useSelector((state) => state.auth.db);
  const { addNewEntry } = useFirestore(db);
  const { Toastify } = useToastify();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const post = {
      author: {
        displayName: userInfo?.displayName,
        photoURL: userInfo?.photoURL,
        uid: userInfo?.uid,
      },
      interaction: {
        like: [],
        view: 0,
        share: [],
      },
      title: data.get("title"),
      content: data.get("content"),
      category: data.get("category"),
      imageURL: data.get("imageURL"),
      published: new Date().toISOString(),
    };
    addNewEntry("blogs", post);
    getData();
    Toastify("success", "Post Published Successfully");
    navigate("/");
  };
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
            <PublishIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add A Post
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
              id="title"
              label="Title"
              name="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={7}
              name="content"
              label="Content"
              type="text"
              id="content"
            />
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                label="Category"
                name="category"
                id="category"
                defaultValue={"general"}
              >
                {categories.map((category) => (
                  <MenuItem value={category}>
                    {category.replace(category[0], category[0].toUpperCase())}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              name="imageURL"
              label="Image URL"
              type="text"
              id="imageURL"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Post;
