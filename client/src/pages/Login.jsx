import { Container, Grid, Paper, Typography } from "@mui/material";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../context/AuthProvider";
import { graphQLRequest } from "../utils/request";

const Login = () => {
  const auth = getAuth();

  const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    const query = `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`;

    await graphQLRequest({
      query,
      variables: {
        uid,
        name: displayName,
      },
    });
  };
  const handleLoginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    const query = `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`;

    await graphQLRequest({
      query,
      variables: {
        uid,
        name: displayName,
      },
    });
  };

  if (user?.uid) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="lg" sx={{ padding: "4rem 0" }}>
      <Paper elevation={6}>
        <Grid container sx={{ height: "80vh" }}>
          <Grid
            item
            xs={8}
            sx={{
              padding: "0 20px",
              backgroundImage:
                "linear-gradient(290deg, #a18cd1 0%, #fbc2eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" sx={{ fontFamily: "Borel" }}>
              Welcome to Note App
            </Typography>
            <Typography variant="p" sx={{ fontFamily: "Borel" }}>
              A note-taking app is a great way to keep track of your thoughts,
              ideas, and tasks. With a note-taking app, you can easily jot down
              notes, create to-do lists, and organize your thoughts in one
              place.
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              padding: "0 10px",
              bgcolor: "white",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <LoginForm
              onLoginWithGoogle={handleLoginWithGoogle}
              onLoginWithFacebook={handleLoginWithFacebook}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
