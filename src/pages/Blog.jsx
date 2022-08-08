import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography, Divider, Avatar, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import defaultImage from "../assets/defaultImage.jpg";
import { Container } from "@mui/system";
import { useFirestore } from "web-firebase";
import { useNavigate, useParams } from "react-router-dom";
import EditModal from "../components/EditModal";
import useBlog from "../hooks/useBlog";
import useToastify from "../hooks/useToastify";
import useFirebase from "../hooks/useFirebase";
import { BlogSkeleton, ImageSkeleton } from "../components/Skeleton";
const Blog = () => {
  const { auth, db, userInfo } = useFirebase();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { getData } = useBlog();
  const { deleteEntry, updateEntry, getEntries } = useFirestore(db);
  const { Toastify } = useToastify();
  const [blog, setBlog] = useState(null);
  const { id: selectedBlog } = useParams();
  console.log(selectedBlog);
  useEffect(() => {
    (async () => {
      try {
        const res = await getEntries("blogs");
        console.log(res);
        setBlog(res?.find((blog) => blog.id === selectedBlog));
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const [liked, setLiked] = useState();
  useEffect(() => {
    getData();
    window.scroll(0, 0);
    return () => getData();
  }, [getData]);

  useEffect(() => {
    setLiked(!!blog?.data?.interaction.like.includes(userInfo?.uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blog]);

  const handleDelete = () => {
    deleteEntry("blogs", blog?.id);
    Toastify("info", "Post Deleted.");
    getData();
    navigate(-1);
  };
  const handleEdit = () => {
    setOpen(true);
  };
  const [likedCount, setLikedCount] = useState(
    blog?.data?.interaction.like.length
  );

  const handleLike = () => {
    let newLike;
    if (userInfo) {
      if (liked) {
        newLike = blog?.data?.interaction.like.filter(
          (like) => like !== userInfo?.uid
        );
        setLiked(false);
        setLikedCount((count) => count - 1);
      } else {
        newLike = !blog?.data?.interaction.like.includes(userInfo.uid)
          ? [...blog?.data?.interaction.like, userInfo?.uid]
          : [...blog?.data?.interaction.like];
        setLiked(true);
        setLikedCount((count) => count + 1);
      }
      console.log("newLike", newLike);
      updateEntry("blogs", selectedBlog, {
        ...blog?.data,
        interaction: {
          view: blog?.data.interaction.view,
          share: blog?.data.interaction.share,
          like: newLike,
        },
      });
    }
  };
  useEffect(() => {
    setLikedCount(blog?.data?.interaction.like.length);
  }, [blog?.data?.interaction.like]);

  return (
    <>
      {open && <EditModal open={open} setOpen={setOpen} />}
      <Container maxWidth="lg">
        <Stack marginX={5} marginY={5} spacing={3}>
          {!blog && <BlogSkeleton />}
          {blog && (
            <>
              <Box>
                <Typography variant="h6" component={"span"}>
                  {new Date(blog?.data?.published).toLocaleDateString("en-us", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  |
                </Typography>
                <Typography variant="h6" color={"blue"} component={"span"}>
                  {" "}
                  {blog?.data?.category.replace(
                    blog?.data?.category[0],
                    blog?.data?.category[0].toUpperCase()
                  )}
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={"bold"} component={"h1"}>
                {blog?.data?.title}
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
                      blog?.data?.author.photoURL ||
                      `https://ui-avatars.com/api/?name=${blog?.data?.author.displayName?.replace(
                        " ",
                        "+"
                      )}`
                    }
                  />
                  <Box>
                    <Typography variant="caption">Author</Typography>
                    <Typography variant="body1" fontWeight={"bold"}>
                      {blog?.data?.author.displayName}
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
                  {userInfo?.uid === blog?.data?.author.uid && (
                    <>
                      <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="edit" onClick={handleEdit}>
                        <EditIcon />
                      </IconButton>
                    </>
                  )}
                  <IconButton
                    aria-label="add to favorites"
                    onClick={handleLike}
                  >
                    <FavoriteIcon
                      sx={{
                        color: liked && userInfo ? "red" : "grey",
                      }}
                    />
                    <Typography variant="h6">{likedCount}</Typography>
                  </IconButton>
                  {/* <IconButton aria-label="share">
                <ShareIcon />
              </IconButton> */}

                  <IconButton aria-label="add to favorites">
                    <VisibilityIcon />
                    <Typography variant="h6">
                      {blog?.data?.interaction.view}
                    </Typography>
                  </IconButton>
                </Box>
              </Box>
              <Divider />
              <Box display={"flex"} flexDirection={"column"} gap={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  {blog?.data?.title}
                </Typography>
                <Typography variant="body1" lineHeight={2}>
                  {blog?.data?.content}
                </Typography>
              </Box>
            </>
          )}
        </Stack>
        <Stack marginY={5} spacing={3}>
          {!blog && <ImageSkeleton />}

          {blog && (
            <Box
              maxWidth={1200}
              component="img"
              mt={3}
              sx={{ borderRadius: "1rem" }}
              src={blog?.data?.imageURL}
              alt="blog-picture"
              onError={(event) => {
                event.target.src = defaultImage;
                event.onerror = null;
              }}
            />
          )}
        </Stack>
      </Container>
    </>
  );
};
export default Blog;
