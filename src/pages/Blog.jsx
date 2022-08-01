import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { Typography, Divider, Avatar, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import defaultImage from "../assets/defaultImage.jpg";
import { Container } from "@mui/system";

const Blog = () => {
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  console.log("selectedBlog", selectedBlog);
  return (
    <Container maxWidth="lg">
      <Stack marginX={5} marginY={5} spacing={3}>
        <Typography variant="h4" fontWeight={"bold"} component={"h1"}>
          {selectedBlog.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.2rem",
              marginLeft: "1rem",
            }}
          >
            <Avatar
              src={
                selectedBlog.author.photoURL ||
                `https://ui-avatars.com/api/?name=${selectedBlog.author.displayName?.replace(
                  " ",
                  "+"
                )}`
              }
            />
            <Box>
              <Typography variant="caption">Author</Typography>
              <Typography variant="body1" fontWeight={"bold"}>
                {selectedBlog.author.displayName}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginRight: "1rem",
            }}
          >
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
            {selectedBlog.title}
          </Typography>
          <Typography variant="body2">{selectedBlog.content}</Typography>
        </Box>
      </Stack>
      <Box
        component="img"
        mt={3}
        sx={{ borderRadius: "1rem" }}
        src={selectedBlog.imageURL || defaultImage}
        alt=""
      />
    </Container>
  );
};
export default Blog;
