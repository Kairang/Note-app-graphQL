import { NoteAddOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useSubmit } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NewNote = ({ folderId }) => {
  const submit = useSubmit();

  const handleCreateNote = () => {
    submit(
      { content: "", folderId },
      { method: "post", action: `/folder/${folderId}` }
    );
  };

  return (
    <div>
      <Tooltip title="Add Note" onClick={handleCreateNote}>
        <IconButton size="small">
          <NoteAddOutlined sx={{ color: "black" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default NewNote;
