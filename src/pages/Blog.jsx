import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Divider, Avatar, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import defaultImage from "../assets/defaultImage.jpg";
import { Container } from "@mui/system";
import { useFirestore } from "web-firebase";
import { useNavigate } from "react-router-dom";
import { blogActions } from "../redux/blogSlice";
import EditModal from "../components/EditModal";

const Blog = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  const { id, data } = selectedBlog;
  const db = useSelector((state) => state.auth.db);
  const { deleteEntry, getEntries } = useFirestore(db);
  const handleDelete = () => {
    deleteEntry("blogs", id);
    getEntries("blogs").then((res) => dispatch(blogActions.setBlogs(res)));
    navigate(-1);
  };
  const handleEdit = () => {
    setOpen(true);
  };
  return (
    <>
      {open && <EditModal open={open} setOpen={setOpen} />}
      <Container maxWidth="lg">
        <Stack marginX={5} marginY={5} spacing={3}>
          <Typography variant="h4" fontWeight={"bold"} component={"h1"}>
            {data.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              rowGap: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1.2rem",
              }}
            >
              <Avatar
                src={
                  data.author.photoURL ||
                  `https://ui-avatars.com/api/?name=${data.author.displayName?.replace(
                    " ",
                    "+"
                  )}`
                }
              />
              <Box>
                <Typography variant="caption">Author</Typography>
                <Typography variant="body1" fontWeight={"bold"}>
                  {data.author.displayName}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              {userInfo.uid === data.author.uid && (
                <>
                  <IconButton aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>

              <IconButton aria-label="add to favorites">
                <VisibilityIcon />
                {/* {data?.interaction.view} */}
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <Box display={"flex"} flexDirection={"column"} gap={3}>
            <Typography variant="h6" fontWeight={"bold"}>
              {data.title}
            </Typography>
            <Typography variant="body1">{data.content}</Typography>
          </Box>
        </Stack>
        <Stack marginY={5} spacing={3}>
          <Box
            // display={"block"}
            // mx={"auto"}
            maxWidth={1200}
            component="img"
            mt={3}
            sx={{ borderRadius: "1rem" }}
            src={data.imageURL || defaultImage}
            alt=""
          />
        </Stack>
      </Container>
    </>
  );
};
export default Blog;
