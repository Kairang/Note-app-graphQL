/* eslint-disable react/prop-types */
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Button, Form, Input, message } from "antd";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = ({ onLoginWithGoogle, onLoginWithFacebook }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const [isValidate, setIsValidate] = useState(false);

  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (formData) => {
    const { displayName, photoURL, email, password } = formData;

    try {
      if (location.pathname === "/register") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        userCredential.user.displayName = displayName;
        userCredential.user.photoURL = photoURL;

        await updateProfile(userCredential.user, {
          displayName,
          photoURL,
        });

        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
      switch (error.code) {
        case "auth/email-already-in-use":
          message.error("Email already in use.");
          break;
        case "auth/user-not-found":
          setIsValidate(true);
          break;
        case "auth/wrong-password":
          setIsValidate(true);
          break;
        case "auth/weak-password":
          message.warning("Weak password.");
          break;
        default:
          console.log(error.code);
      }
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "bold", pb: "1.5rem" }}>
        {location.pathname === "/login" ? "LOGIN" : "REGISTER"}
      </Typography>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={() => setIsValidate(false)}
      >
        {location.pathname !== "/login" && (
          <>
            <Form.Item
              name="displayName"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={
                  <PersonOutlineOutlinedIcon color="action" fontSize="small" />
                }
                placeholder="Username"
                allowClear
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item name="photoURL">
              <Input
                prefix={
                  <AddPhotoAlternateIcon color="action" fontSize="small" />
                }
                placeholder="Enter your URL photo"
                allowClear
                autoComplete="off"
              />
            </Form.Item>
          </>
        )}
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<EmailOutlinedIcon color="action" fontSize="small" />}
            placeholder="Email"
            type="email"
            allowClear
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOpenOutlinedIcon color="action" fontSize="small" />}
            placeholder="Password"
            allowClear
            autoComplete="off"
          />
        </Form.Item>
        {isValidate && (
          <Form.Item noStyle>
            <p style={{ color: "#ff4d4f", paddingBottom: "10px" }}>
              Email or password is incorrect!
            </p>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            {location.pathname === "/login" ? "Login" : "Register"}
          </Button>
        </Form.Item>
      </Form>
      <Divider sx={{ p: "1rem 0" }}>
        <Chip label="OR LOGIN WITH" />
      </Divider>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "10px",
        }}
      >
        <IconButton
          sx={{ bgcolor: "#d74e46", "&:hover": { bgcolor: "#e8291e" } }}
          size="small"
          onClick={onLoginWithGoogle}
        >
          <GoogleIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton
          sx={{ bgcolor: "#405796", "&:hover": { bgcolor: "#223872" } }}
          size="small"
          onClick={onLoginWithFacebook}
        >
          <FacebookOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      {location.pathname === "/login" ? (
        <Typography sx={{ pt: "2rem" }}>
          Not a member?&nbsp;
          <Link component="button" underline="none" onClick={handleRegister}>
            Signup now
          </Link>
        </Typography>
      ) : (
        <Typography sx={{ pt: "2rem" }}>
          Already have an account?&nbsp;
          <Link component="button" underline="none" onClick={handleLogin}>
            Login
          </Link>
        </Typography>
      )}
    </>
  );
};

export default LoginForm;
