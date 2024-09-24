import React, { useEffect } from "react";
import "./blog.css";
import Navbar from "../navbar/navbar";
import { getBlog } from "../../store/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Blog() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const blog = useSelector((state) => state?.blog.blog);
  const ContentDisplay = ({ content }) => (
    <div
      className="blog-paragraph"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="blog-box">
          <div className="title">
            <h3 style={{ textAlign: "left", fontFamily: "cursive" }}>
              {blog?.title}
            </h3>
            <p className="author-name">{`( author - ${blog?.author} )`}</p>
          </div>
          <div className="description">
            <img
              className="image"
              src={`http://localhost:5000/images/${blog?.image}`}
            ></img>
            <ContentDisplay content={blog?.blogContent} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
