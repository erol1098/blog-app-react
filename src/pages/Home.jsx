import React from "react";
import BlogCard from "../components/BlogCard";
import {
  Grid,
  Stack,
  Box,
  Divider,
  TextField,
  FormControl,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BlogCardFeatured from "../components/BlogCardFeatured";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/auth-slice";
import useFirebase from "../hooks/useFirebase";

const Home = () => {
  const dispatch = useDispatch();
  const { auth, db, userInfo } = useFirebase();
  dispatch(authActions.setData({ auth, db, userInfo }));

  return (
    <Grid container spacing={2} margin={2}>
      <Grid
        item
        xs={12}
        sm={8}
        md={8}
        paddingX={2}
        sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        component="main"
      >
        <FormControl fullWidth margin="normal">
          <TextField
            id="searchBlog"
            placeholder="Search Blogs"
            type={"search"}
            variant="outlined"
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <BlogCardFeatured />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            columnGap: "1rem",
            rowGap: "1rem",
          }}
        >
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </Box>
      </Grid>
      <Grid item xs={0} md={4} component="article">
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
        >
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Home;
