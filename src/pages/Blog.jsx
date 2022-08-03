import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
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
import EditModal from "../components/EditModal";
import useBlog from "../hooks/useBlog";

const Blog = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { getData } = useBlog();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  const savedBlog = selectedBlog
    ? selectedBlog
    : JSON.parse(sessionStorage.getItem("selectedBlog"));

  const { id, data } = savedBlog;
  const db = useSelector((state) => state.auth.db);
  const { deleteEntry, updateEntry } = useFirestore(db);
  getData();
  window.scroll(0, 0);
  const handleDelete = () => {
    deleteEntry("blogs", id);
    getData();
    navigate(-1);
  };
  const handleEdit = () => {
    setOpen(true);
  };
  const [liked, setLiked] = useState(
    !!data?.interaction.like.includes(userInfo?.uid)
  );
  const [likedCount, setLikedCount] = useState(data?.interaction.like.length);

  const handleLike = () => {
    let newLike;
    if (userInfo) {
      if (liked) {
        newLike = data?.interaction.like.filter(
          (like) => like !== userInfo?.uid
        );
        setLiked(false);
        setLikedCount((count) => count - 1);
      } else {
        newLike = !data?.interaction.like.includes(userInfo.uid)
          ? [...data?.interaction.like, userInfo?.uid]
          : [...data?.interaction.like];
        setLiked(true);
        setLikedCount((count) => count + 1);
      }
      updateEntry("blogs", id, {
        ...data,
        interaction: {
          view: data.interaction.view,
          share: data.interaction.share,
          like: newLike,
        },
      });
    }
  };
  useEffect(() => {
    setLikedCount(data?.interaction.like.length);
  }, [data?.interaction.like]);

  return (
    <>
      {open && <EditModal open={open} setOpen={setOpen} />}
      <Container maxWidth="lg">
        <Stack marginX={5} marginY={5} spacing={3}>
          <Box>
            <Typography variant="h6" component={"span"}>
              {new Date(data?.published).toLocaleDateString("en-us", {
                day: "numeric",
                month: "short",
              })}{" "}
              |
            </Typography>
            <Typography variant="h6" color={"blue"} component={"span"}>
              {" "}
              {data?.category.replace(
                data?.category[0],
                data?.category[0].toUpperCase()
              )}
            </Typography>
          </Box>
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
              {userInfo?.uid === data?.author.uid && (
                <>
                  <IconButton aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
              <IconButton aria-label="add to favorites" onClick={handleLike}>
                <FavoriteIcon
                  sx={{
                    color: liked && userInfo ? "red" : "grey",
                  }}
                />{" "}
                <Typography variant="h6">{likedCount}</Typography>
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>

              <IconButton aria-label="add to favorites">
                <VisibilityIcon />
                <Typography variant="h6">{data?.interaction.view}</Typography>
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
            src={data.imageURL}
            alt="blog-picture"
            onError={(event) => {
              event.target.src = defaultImage;
              event.onerror = null;
            }}
          />
        </Stack>
      </Container>
    </>
  );
};
export default Blog;
