import React, { useEffect } from "react";
import "./home.css";
import img from "../../image/frontImg.png";
import Navbar from "../navbar/navbar";
import { Box } from "@mui/material";
import { allBlogs, getBlog } from "../../store/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allPersonalBlogs = useSelector((state) => state?.blog.allBlogs);

  const handleShowBlog = (id) => {
    const page = "blogPage";
    dispatch(getBlog(id, navigate, page));
  };
  
  useEffect(() => {
    dispatch(allBlogs());
  }, []);

  return (
    <>
      <Navbar />
      <div className="half-background">
        <img src={img} style={{ width: 180, marginBottom: -20 }}></img>
        <h3>Welcome to the Our Blogs..</h3>
        <p className="header-Paragraph">
          Here some blogs and tutorials contributed by Akshay.
        </p>
      </div>
      <div>
        {allPersonalBlogs?.map((blog, idx) => (
          <Box
            key={idx}
            sx={{
              width: 230,
              height: 230,
              boxShadow: 3,
              margin: 2,
              display: "inline-block",
              lineHeight: "100px",
              cursor: "pointer",
              borderRadius: 3,
              "&:hover": {
                boxShadow: 10,
              },
            }}
            onClick={() => {
              handleShowBlog(blog.id);
            }}
          >
            <div className="box-title">
              <h3
                style={{
                  textAlign: "left",
                  fontFamily: "cursive",
                  marginTop: -25,
                }}
              >
                {blog.title}
              </h3>
            </div>
            <div className="blog-description">
              <p
                style={{
                  fontSize: "0.9em",
                  lineHeight: "1.5em",
                  paddingLeft: 10,
                }}
              >
                {`${blog.blogContent?.substring(0, 200)}...`}
              </p>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
}

export default Home;
