import React, { useState, useEffect } from "react";
import "./createBlog.css";
import Stack from "@mui/material/Stack";
import CreateIcon from "@mui/icons-material/Create";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../navbar/navbar";
import { TextField, InputLabel, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, successMessage } from "../../store/actions/blogActions";
import UploadIcon from "@mui/icons-material/Upload";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitLoader = useSelector((state) => state?.blog.loader);

  const [blogName, setBlogName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [loader, setLoader] = useState(submitLoader);
  const [selectedImage, setSelectedImage] = useState(null);

  const ContentDisplay = ({ content }) => (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const meassage = {
      message: "Image added!",
      success: true,
    };
    dispatch(successMessage(meassage));
  };

  const handleCreateBlogButton = () => {
    const formData = new FormData();
    const blogData = {
      title: blogName,
      author: authorName,
      blogContent: blogContent,
    };
    formData.append("image", selectedImage);
    formData.append("blogData", JSON.stringify(blogData));
    dispatch(addBlog(formData, navigate));
  };

  useEffect(() => {
    setLoader(submitLoader);
  }, [submitLoader]);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="create-blog-box ">
          <div className="title">
            <h3 style={{ textAlign: "center", fontFamily: "cursive" }}>
              Create Blog
            </h3>
          </div>
          <div className="fields-container">
            <div className="fields">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <InputLabel style={{ color: "black" }}>Blog Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter a Blog name"
                    name="blogName"
                    size="small"
                    onChange={(e) => setBlogName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={5}>
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
                <Grid item xs={2}>
                  <InputLabel style={{ color: "black" }}>
                    Upload Image
                  </InputLabel>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="contained-button-file"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      fullWidth
                      sx={{
                        backgroundColor: "#071952",
                        "&:hover": {
                          backgroundColor: "#06173f",
                        },
                      }}
                    >
                      <UploadIcon />
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel style={{ color: "black" }}>
                    Blog Decsription
                  </InputLabel>
                  <ReactQuill
                    theme="snow"
                    value={blogContent}
                    onChange={setBlogContent}
                    style={{
                      height: "270px",
                      borderRadius: "5px",
                      marginBottom: 30,
                    }}
                  />
                </Grid>

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
