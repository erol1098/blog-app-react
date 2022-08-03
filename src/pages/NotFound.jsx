import notFound from "../assets/not-found.png";
import React from "react";
import { Box } from "@mui/material";
import { Container } from "@mui/system";

const NotFound = () => {
  window.scroll(0, 0);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{ width: "100%", height: "100%" }}
        display="flex"
        justifyContent={"center"}
      >
        <Box component={"img"} src={notFound} alt={"no-result-found"} />
      </Box>
    </Container>
  );
};

export default NotFound;
