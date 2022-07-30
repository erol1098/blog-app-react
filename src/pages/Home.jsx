import React, { useState, useMemo } from "react";
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
// import BlogCardFeatured from "../components/BlogCardFeatured";
import useBlog from "../hooks/useBlog";
const Home = () => {
  const { blogs } = useBlog();
  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => setQuery(e.target.value);
  const filteredBlogs = useMemo(
    () =>
      blogs?.filter((blog) =>
        blog.data.title.toLowerCase().includes(query.toLowerCase())
      ),
    [blogs, query]
  );
  console.log("object", filteredBlogs);
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
            value={query}
            onChange={queryChangeHandler}
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
        {/* <BlogCardFeatured data={blogs[0]?.data} /> */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            columnGap: "1rem",
            rowGap: "1rem",
          }}
        >
          {filteredBlogs?.map((blog) => (
            <BlogCard key={blog?.id} data={blog?.data} />
          ))}
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
