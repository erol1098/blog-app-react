import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import DefaultImage from "../assets/defaultImage.jpg";
import { useNavigate } from "react-router-dom";
import { blogActions } from "../redux/blogSlice";
import { useFirestore } from "web-firebase";
import { useState, useEffect } from "react";
const BlogCard = ({ blog }) => {
  const { id, data } = blog;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const db = useSelector((state) => state.auth.db);
  const { updateEntry } = useFirestore(db);
  const userInfo = useSelector((state) => state.auth.userInfo);

  //? Like Button
  const [liked, setLiked] = useState(
    !!data?.interaction.like.includes(userInfo.uid)
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

  //? View Count
  const viewCountRef = useRef(data?.interaction.view);

  return (
    <Card sx={{ width: 320, height: 475, borderRadius: "1rem" }}>
      <CardMedia
        component="img"
        height="200"
        image={data?.imageURL || DefaultImage}
        alt="blog-image"
      />
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={
              data.author.photoURL ||
              `https://ui-avatars.com/api/?name=${data.author.displayName.replace(
                " ",
                "+"
              )}`
            }
          />
        }
        sx={{ height: 100 }}
        title={data?.title}
        subheader={new Date(data?.published).toDateString()}
      />

      <CardContent sx={{ height: 100 }}>
        <Typography variant="body2" color="text.secondary">
          {`${data?.content.slice(0, 150)}...`}
          <Typography
            variant="body1"
            component={"span"}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              sessionStorage.setItem("selectedBlog", JSON.stringify(blog));
              dispatch(blogActions.setSelectedBlog(blog));
              updateEntry("blogs", id, {
                ...data,
                interaction: {
                  view: viewCountRef.current + 1,
                  share: data.interaction.share,
                  like: data.interaction.like,
                },
              });
              navigate(`/${data.title}`);
            }}
          >
            Read More
          </Typography>
        </Typography>
      </CardContent>

      <CardActions
        sx={{ height: 75, display: "flex", justifyContent: "space-between" }}
        disableSpacing
      >
        <Box>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon
              sx={{
                color: liked && userInfo ? "red" : "grey",
              }}
            />
            <Typography variant="h6">{likedCount}</Typography>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Box>
        <IconButton aria-label="add to favorites">
          <VisibilityIcon />
          <Typography variant="h6">{viewCountRef.current}</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default BlogCard;
