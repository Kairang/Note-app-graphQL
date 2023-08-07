import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Container } from "@mui/material";
import router from "./router";
import "./firebase/config";
import "./index.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Container maxWidth="lg">
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>
);
