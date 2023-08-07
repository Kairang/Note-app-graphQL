import { Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div id="error-page">
      <Typography variant="h2" sx={{ fontFamily: "Borel" }}>
        Opps!
      </Typography>
      <Typography variant="h5">
        Sorry, an unexpected error has occurred.
      </Typography>
      <i>{error.statusText || error.message}</i>
    </div>
  );
};

export default Error;
