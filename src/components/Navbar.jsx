import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Divider, ListItemIcon } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Login from "@mui/icons-material/Login";
import Logo from "../assets/logo.png";
//? User
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "web-firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const auth = useSelector((state) => state.auth.auth);
  const { logOut } = useAuth(auth);
  //? Navbar-Related Functions
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  return (
    <AppBar position="sticky" sx={{ paddingY: "0.5rem" }} color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component={"img"}
            src={Logo}
            width="48px"
            alt=""
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Blogger
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={(e) => {
                  handleCloseNavMenu();
                  navigate("/post");
                }}
              >
                <Typography textAlign="center">Add a post</Typography>
              </MenuItem>
              {/* <MenuItem>
                <Typography textAlign="center">About</Typography>
              </MenuItem> */}
            </Menu>
          </Box>
          <Box
            component={"img"}
            src={Logo}
            width="48px"
            alt=""
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              cursor: "pointer",
            }}
          >
            Blogger
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              marginX: "1rem",
            }}
          >
            <Button
              onClick={(e) => {
                handleCloseNavMenu();
                navigate("/post");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Add a post
            </Button>
            {/* <Button sx={{ my: 2, color: "white", display: "block" }}>
              About
            </Button> */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleClick} sx={{ p: 0 }}>
                <Avatar
                  src={
                    userInfo?.photoURL ||
                    `https://ui-avatars.com/api/?name=${userInfo?.displayName?.replace(
                      " ",
                      "+"
                    )}`
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  px: 1,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => navigate("/")}>
                <Avatar
                  src={
                    userInfo?.photoURL ||
                    `https://ui-avatars.com/api/?name=${userInfo?.displayName?.replace(
                      " ",
                      "+"
                    )}`
                  }
                />
                {userInfo?.displayName || "Profile"}
              </MenuItem>
              <Divider />
              {!userInfo && (
                <MenuItem onClick={() => navigate("/register")}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add Account
                </MenuItem>
              )}

              {!userInfo && (
                <MenuItem onClick={() => navigate("/login")}>
                  <ListItemIcon>
                    <Login fontSize="small" />
                  </ListItemIcon>
                  Login
                </MenuItem>
              )}
              {userInfo && (
                <>
                  <MenuItem onClick={() => navigate("/setting")}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logOut();
                      navigate("/");
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
