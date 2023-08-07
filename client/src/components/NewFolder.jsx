import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AddNewFolder } from "../utils/folderUtils";

const NewFolder = () => {
  const [newFolderName, setNewFolderName] = useState();
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const popupName = searchParams.get("popup");
  const navigate = useNavigate();

  const handleOpenPopup = () => setSearchParams({ popup: "add-folder" });

  const handleClosePopup = () => {
    setNewFolderName("");
    navigate(-1);
  };

  const handleNameChange = (e) => setNewFolderName(e.target.value);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    await AddNewFolder({ name: newFolderName });
    handleClosePopup();
  };

  useEffect(() => {
    if (popupName === "add-folder") {
      setOpen(true);
      return;
    }

    setOpen(false);
  }, [popupName]);

  return (
    <div>
      <Tooltip title="Add Folder">
        <IconButton size="small" onClick={handleOpenPopup}>
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClosePopup}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Cancel</Button>
          <Button onClick={handleCreateFolder}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewFolder;
