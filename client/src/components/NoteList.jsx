import { Box, Card, CardContent, Grid, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import moment from "moment";
import NewNote from "./NewNote";

const NoteList = () => {
  const { noteId, folderId } = useParams();
  const { folder } = useLoaderData();
  const navigate = useNavigate();

  const [activeNoteId, setActiveNoteId] = useState();

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }

    if (folder?.notes?.[0]) navigate(`note/${folder.notes[0].id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, folder.notes]);

  return (
    <Grid container height="100%">
      <Grid item xs={4}>
        <List
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "#F0EBE3",
            padding: "5px",
            textAlign: "left",
            overflowY: "auto",
          }}
          subheader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "bold", mb: "5px" }}>
                Notes
              </Typography>
              <NewNote folderId={folderId} />
            </Box>
          }
        >
          {folder.notes.map(({ id, content, updatedAt }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    mb: "5px",
                    backgroundColor: id === activeNoteId ? "#fcc7ff" : null,
                  }}
                >
                  <CardContent
                    sx={{ padding: "10px", "&:last-child": { pb: "10px" } }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "Empty"}`,
                      }}
                    />
                    <Typography sx={{ fontSize: "12px" }}>
                      Last Update:{" "}
                      {moment(updatedAt).format("DD-MM-YYYY hh:mm:ss")}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default NoteList;
