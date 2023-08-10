import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const UserMenu = () => {
  const { user } = useContext(AuthContext);
  const { displayName, photoURL, auth } = user;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", columnGap: "10px", cursor: "pointer" }}
        onClick={handleOpen}
      >
        <Avatar alt="avatar" src={photoURL} sx={{ width: 24, height: 24 }} />
        <Typography sx={{ color: "#0c3b4f" }}>{displayName}</Typography>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>Setting</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
