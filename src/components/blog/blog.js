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

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [id, dispatch]);
  return (
    <>
      <Navbar />
      <div className="container">
        {blog?.map((data, idx) => {
          return (
            <div className="box" key={idx}>
              <div className="title">
                <h3 style={{ textAlign: "left", fontFamily: "cursive" }}>
                  {data.title}
                </h3>
                <p className="author-name">{`( author - ${data.author} )`}</p>
              </div>
              <div className="description">
                <p className="blog-paragraph">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.blogContent}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Blog;
