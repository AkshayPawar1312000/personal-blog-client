import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";

function Message() {
  const successMess = useSelector((state) => state?.blog.successMessage);
  const errorMess = useSelector((state) => state?.blog.errorMessage);

  const [openSuccessAlert, setOpenSuccessAlert] = useState( successMess?.success);
  const [openErrorAlert, setOpenErrorAlert] = useState(errorMess?.success);

  const handleCloseSuccessAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessAlert(false);
  };
  const handleCloseErrorAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorAlert(false);
  };

  useEffect(() => {
    setOpenSuccessAlert(successMess?.success);
  }, [successMess]);
  useEffect(() => {
    setOpenErrorAlert(errorMess?.success);
  }, [errorMess]);
  return (
    <>
      {/* <-------------- Alert User added Success Massage ---------------> */}
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={4000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        ContentProps={{ color: "green" }}
      >
        <Alert
          onClose={handleCloseSuccessAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMess?.message}
        </Alert>
      </Snackbar>
      {/* <-------------- Alert User added fail Massage ---------------> */}
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={4000}
        onClose={handleCloseErrorAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        ContentProps={{ color: "red" }}
      >
        <Alert
          onClose={handleCloseErrorAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMess?.message}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Message;
