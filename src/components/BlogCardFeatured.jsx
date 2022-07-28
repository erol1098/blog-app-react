import * as React from "react";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";

const BlogCardFeatured = ({ data }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  console.log("data", data);
  return (
    <Card
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        borderRadius: "1rem",
      }}
    >
      <Box>
        <CardMedia
          component="img"
          height="194"
          image={data?.imageURL}
          alt="blog-image"
        />
      </Box>
      <Box>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={
                data?.author.photoURL ||
                `https://ui-avatars.com/api/?name=${userInfo?.displayName?.replace(
                  " ",
                  "+"
                )}`
              }
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data?.title}
          subheader={new Date(data?.published).toDateString()}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {`${data?.content.slice(0, 150)}...`}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ height: 75, display: "flex", justifyContent: "space-between" }}
          disableSpacing
        >
          <Box>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
          <IconButton aria-label="add to favorites">
            <VisibilityIcon />
            {/* {data?.interaction.view} */}
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};
export default BlogCardFeatured;
