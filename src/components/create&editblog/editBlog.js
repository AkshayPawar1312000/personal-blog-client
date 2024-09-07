import React, { useState, useEffect } from "react";
import "./editBlog.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../navbar/navbar";
import { TextField, InputLabel } from "@mui/material";
import { getBlog, updateBlog } from "../../store/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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

  const handleEditBlogButton = () => {
    const blogData = {
      title: title,
      author: author,
      blogContent: blogContent,
    };
    dispatch(updateBlog(id, blogData, navigate));
  };

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (blog) {
      setTitleName(blog[0].title || "");
      setAuthor(blog[0].author || "");
      setBlogContent(blog[0].blogContent || "");
    }
  }, [blog]);
  
  useEffect(() => {
    setLoader(submitLoader);
  }, [submitLoader]);
  return (
    <>
    <Navbar/>
      <div className="container">
        <div className="box">
          <div className="title">
            <h3 style={{ textAlign: "center", fontFamily: "cursive" }}>
              Edit Blog
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
                    name="title"
                    size="small"
                    value={title}
                    onChange={(e) => setTitleName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
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
                    value={blogContent}
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
