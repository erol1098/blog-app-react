import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/erol-mahmuto%C4%9Flu/"
      >
        Erol Mahmutoglu
      </Link>
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 5,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Blogger site designed by{" "}
          <Link href="https://github.com/erol1098" target={"_blank"}>
            erol1098
          </Link>
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};
export default Footer;
