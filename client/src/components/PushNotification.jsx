import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useState } from "react";
import { createClient } from "graphql-ws";
import { Badge, Menu, MenuItem } from "@mui/material";

const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const query = `subscription Subscription {
    notification {
      message
    }
}`;

const PushNotification = () => {
  const [invisible, setInvisible] = useState(true);
  const [notification, setNotification] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => {
    if (notification) setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setInvisible(true);
    setNotification("");
  };

  useEffect(() => {
    // subscription
    (async () => {
      const subscription = client.iterate({
        query,
      });

      const { value } = await subscription.next();
      setNotification(value.data.notification.message);
      setInvisible(false);
    })();
  }, []);

  return (
    <>
      <Badge color="secondary" variant="dot" invisible={invisible}>
        <NotificationsIcon
          sx={{ ml: "10px", cursor: "pointer" }}
          onClick={handleOpen}
        />
      </Badge>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>{notification}</MenuItem>
      </Menu>
    </>
  );
};

export default PushNotification;
