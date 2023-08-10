import { Box, Card, CardContent, List, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";

const FolderList = ({ folders }) => {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState();

  useEffect(() => {
    setActiveFolderId(folderId);
  }, [folderId]);

  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#224142",
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
          <Typography sx={{ fontWeight: "bold", color: "white", mb: "5px" }}>
            Folders
          </Typography>
          <NewFolder />
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folder/${id}`}
            style={{ textDecoration: "none" }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
                mb: "5px",
                backgroundColor: id === activeFolderId ? "#bef54f" : null,
              }}
            >
              <CardContent
                sx={{ padding: "10px", "&:last-child": { pb: "10px" } }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
};

export default FolderList;

FolderList.propTypes = {
  folders: PropTypes.array,
};
FolderList.defaultProps = {
  folders: [],
};
