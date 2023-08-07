import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
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

  if (user?.uid) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontFamily: "Borel" }}>
        Welcome to Note App
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={handleLoginWithGoogle}
      >
        Login with Google
      </Button>
    </>
  );
};

export default Login;
