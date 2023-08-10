import { Box, Grid, Paper, Typography } from "@mui/material";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import PushNotification from "../components/PushNotification";

const Home = () => {
  const { folders } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: "2rem" }}>
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

      <Paper elevation={6}>
        <Grid container sx={{ height: "70vh" }}>
          <Grid item xs={3} sx={{ height: "100%" }}>
            <FolderList folders={folders} />
          </Grid>
          <Grid item xs={9} sx={{ height: "100%" }}>
            <Outlet />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Home;
