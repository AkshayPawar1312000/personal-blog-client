import React, { useState, useEffect } from "react";
import "./editBlog.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../navbar/navbar";
import { TextField, InputLabel } from "@mui/material";
import {
  getBlog,
  updateBlog,
  successMessage,
} from "../../store/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


function EditBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const submitLoader = useSelector((state) => state?.blog.loader);
  const blog = useSelector((state) => state?.blog.blog);
  const [title, setTitleName] = useState("");
  const [author, setAuthor] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [loader, setLoader] = useState(submitLoader);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const meassage = {
      message: "Image added!",
      success: true,
    };
    dispatch(successMessage(meassage));
  };

  const handleEditBlogButton = () => {
    const formData = new FormData();
    const blogData = {
      title: title,
      author: author,
      blogContent: blogContent,
    };
    formData.append("image", selectedImage);
    formData.append("blogData", JSON.stringify(blogData));
    dispatch(updateBlog(id, formData, navigate));
  };

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (blog) {
      setTitleName(blog.title || "");
      setAuthor(blog.author || "");
      setBlogContent(blog.blogContent || "");
    }
  }, [blog]);

  useEffect(() => {
    setLoader(submitLoader);
  }, [submitLoader]);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="edit-blog-box">
          <div className="title">
            <h3 style={{ textAlign: "center", fontFamily: "cursive" }}>
              Edit Blog
            </h3>
          </div>
          <div className="fields-contaoner">
            <div className="fields">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <InputLabel style={{ color: "black" }}>Blog Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter a Blog name"
                    name="title"
                    size="small"
                    value={title}
                    onChange={(e) => setTitleName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <InputLabel style={{ color: "black" }}>
                    Author Name
                  </InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter a Author name"
                    name="author"
                    size="small"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
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
                    style={{ height: "270px" , borderRadius:"5px",marginBottom:30}}
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
                  onClick={handleEditBlogButton}
                >
                  {loader ? (
                    <CircularProgress size={25} style={{ color: "white" }} />
                  ) : (
                    "Edit Blog"
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
export default EditBlog;
