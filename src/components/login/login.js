import React, { useState, useEffect } from "react";
import "./login.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Img from "../../image/userImg.png";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Navbar from "../navbar/navbar";
import { Typography, TextField, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/actions/userActions";
import { Controller, useForm } from "react-hook-form";

function UserRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitLoader = useSelector((state) => state?.blog.loader);

  const [loader, setLoader] = useState(submitLoader);

  const handleSingUpButton = () => {
    navigate("/userRegistration");
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(userLogin(data, navigate));
  };

  useEffect(() => {
    setLoader(submitLoader);
  }, [submitLoader]);

  return (
    <>
      <Navbar />
      <div className="main-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="main-login-box">
            <div className="user-title">
              <img src={Img} alt="User" className="user-image" />
              <h3 style={{ textAlign: "center", fontFamily: "cursive" }}>
                User Login
              </h3>
            </div>
            <div className="all-fields-container">
              <div className="fields">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <InputLabel style={{ color: "black" }}>Email ID</InputLabel>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Enter a valid email",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          fullWidth
                          placeholder="Enter your email"
                          error={!!errors.email}
                          helperText={errors.email ? errors.email.message : ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel style={{ color: "black" }}>Password</InputLabel>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          fullWidth
                          placeholder="Enter your password"
                          type="password"
                          error={!!errors.password}
                          helperText={
                            errors.password ? errors.password.message : ""
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </div>
              <Typography
                align="left"
                variant="body1"
                component="div"
                marginTop={1}
              >
                You don't have any account
                <Typography
                  variant="subtitle1"
                  component="span"
                  to="#"
                  color="primary"
                  sx={{ mx: 0.5, cursor: "pointer" }}
                  onClick={handleSingUpButton}
                >
                  Sign up
                </Typography>
              </Typography>
              <div className="button">
                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    endIcon={loader ? "" : <LogoutIcon />}
                    disabled={loader ? true : false}
                    sx={{
                      backgroundColor: "#071952",
                      "&:hover": {
                        backgroundColor: "#06173f",
                      },
                    }}
                    // onClick={handleLogInButton}
                  >
                    {loader ? (
                      <CircularProgress size={25} style={{ color: "white" }} />
                    ) : (
                      " Log In"
                    )}
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default UserRegistration;
