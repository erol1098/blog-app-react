import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useFirestore } from "web-firebase";
import { blogActions } from "../redux/blogSlice";
import useBlog from "../hooks/useBlog";
import useToastify from "../hooks/useToastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const theme = createTheme();
const categories = ["general", "politics", "science", "sports", "technology"];
const EditModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  //////////////////////////////////////////////////
  const dispatch = useDispatch();
  const db = useSelector((state) => state.auth.db);
  const { updateEntry } = useFirestore(db);
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  const { id, data } = selectedBlog;
  const { getData } = useBlog();
  const { Toastify } = useToastify();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const post = {
      author: {
        displayName: data.author.displayName,
        photoURL: data.author.photoURL,
        uid: data.author.uid,
      },
      interaction: {
        like: data.interaction.like,
        view: data.interaction.view,
        share: data.interaction.share,
      },
      title: formData.get("title"),
      content: formData.get("content"),
      category: formData.get("category"),
      imageURL: formData.get("imageURL"),
      published: new Date().toISOString(),
    };
    updateEntry("blogs", id, post);
    dispatch(blogActions.setSelectedBlog({ id, data: post }));
    Toastify("info", "Post Edited.");

    getData();
    handleClose();
  };
  /////////////////////////////////////////////////////
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit Post
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
                  defaultValue={data.title}
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
                  defaultValue={data.content}
                />
                <FormControl fullWidth>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    label="Category"
                    name="category"
                    id="category"
                    defaultValue={data.category}
                  >
                    {categories.map((category, i) => (
                      <MenuItem key={i} value={category}>
                        {category.replace(
                          category[0],
                          category[0].toUpperCase()
                        )}
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
                  defaultValue={data.imageURL}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Edit Post
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </Modal>
  );
};
export default EditModal;
