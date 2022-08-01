import React, { useState, useMemo } from "react";
import BlogCard from "../components/BlogCard";
import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  TextField,
  FormControl,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";

const Root = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
}));
const Home = () => {
  const blogs = useSelector((state) => state.blog.blogs);
  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => setQuery(e.target.value);
  const filteredBlogs = useMemo(
    () =>
      blogs?.filter((blog) =>
        blog.data.title.toLowerCase().includes(query.toLowerCase())
      ),
    [blogs, query]
  );
  return (
    <Container maxWidth="lg">
      <Box
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
        <Divider />
        <Root
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            columnGap: "1rem",
            rowGap: "2rem",
            margin: "auto",
          }}
        >
          {filteredBlogs?.map((blog) => (
            <BlogCard key={blog?.id} blog={blog} />
          ))}
        </Root>
      </Box>
    </Container>
  );
};

export default Home;
