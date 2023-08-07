import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import Error from "../pages/Error";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import { FoldersLoader } from "../utils/folderUtils";
import {
  NotesLoader,
  NoteLoader,
  AddNewNote,
  UpdateNote,
} from "../utils/noteUtils";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: FoldersLoader,
            children: [
              {
                element: <NoteList />,
                path: "folder/:folderId",
                action: AddNewNote,
                loader: NotesLoader,
                children: [
                  {
                    element: <Note />,
                    path: "note/:noteId",
                    action: UpdateNote,
                    loader: NoteLoader,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
