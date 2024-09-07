import React, { useState, useEffect } from "react";
import "./createBlog.css";
import Stack from "@mui/material/Stack";
import CreateIcon from "@mui/icons-material/Create";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../navbar/navbar";
import { TextField, InputLabel, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../../store/actions/blogActions";

function CreateBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitLoader = useSelector((state) => state?.blog.loader);

  const [blogName, setBlogName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [loader, setLoader] = useState(submitLoader);

  const handleCreateBlogButton = () => {
    const blogData = {
      title: blogName,
      author: authorName,
      blogContent: blogContent,
    };
    if (blogName && authorName && blogContent) {
      dispatch(addBlog(blogData, navigate));
    }
  };

  useEffect(() => {
    setLoader(submitLoader);
  }, [submitLoader]);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="box">
          <div className="title">
            <h3 style={{ textAlign: "center", fontFamily: "cursive" }}>
              Create Blog
            </h3>
          </div>
          <div className="fields-contaoner">
            <div className="fields">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <InputLabel style={{ color: "black" }}>Blog Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter a Blog name"
                    name="blogName"
                    size="small"
                    onChange={(e) => setBlogName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel style={{ color: "black" }}>
                    Author Name
                  </InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter a Author name"
                    name="authorName"
                    size="small"
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel style={{ color: "black" }}>
                    Blog Decsription
                  </InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter a Blog decsription"
                    name="blogDecsription"
                    size="small"
                    multiline
                    rows={8}
                    onChange={(e) => setBlogContent(e.target.value)}
                  />
                </Grid>
                <Grid></Grid>
              </Grid>
            </div>
            <div className="button">
              <Stack direction="row" spacing={2} marginTop={1}>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={loader ? "" : <CreateIcon />}
                  disabled={loader ? true : false}
                  sx={{
                    backgroundColor: "#071952",
                    "&:hover": {
                      backgroundColor: "#06173f",
                    },
                  }}
                  onClick={handleCreateBlogButton}
                >
                  {loader ? (
                    <CircularProgress size={25} style={{ color: "white" }} />
                  ) : (
                    "Create Blog"
                  )}
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateBlog;
