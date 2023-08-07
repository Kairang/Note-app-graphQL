import { Box, Grid, Typography } from "@mui/material";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import PushNotification from "../components/PushNotification";

const Home = () => {
  const { folders } = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant="h4"
        sx={{ fontFamily: "Borel", mb: "20px", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Note App
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "right", mb: "15px" }}>
        <UserMenu />
        <PushNotification />
      </Box>

      <Grid
        container
        sx={{ height: "70vh", boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.24)" }}
      >
        <Grid item xs={3} sx={{ height: "100%" }}>
          <FolderList folders={folders} />
        </Grid>
        <Grid item xs={9} sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
