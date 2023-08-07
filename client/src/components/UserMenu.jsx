import { useContext, useState } from "react";
import { Avatar, Box, MenuItem, Menu, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";

const UserMenu = () => {
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext);

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
        <Typography>{displayName}</Typography>
        <Avatar alt="avatar" src={photoURL} sx={{ width: 24, height: 24 }} />
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
