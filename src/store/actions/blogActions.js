import * as api from "../apis/index";
import {
  CREATE_BLOG,
  ALL_BLOGS,
  DELETE_BLOG,
  GET_BLOG,
  UPDATE_BLOG,
  LOADER,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from "../constatnt";

// This loader action works accordingly user action
export const loader = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOADER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Dispatches a success message with provided data.
export const successMessage = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Dispatches an error message with provided data.
export const errorMessage = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ERROR_MESSAGE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addBlog = (blogData, navigate) => async (dispatch) => {
  try {
    if (document.cookie) {
      const { data } = await api.addBlog(blogData);
      dispatch({
        type: CREATE_BLOG,
        payload: data,
      });
      let meassage = {
        message: data?.message,
        success: data?.success,
      };
      await dispatch(successMessage(meassage));
      if (data) {
        navigate(`/dashboard`);
      }
    } else {
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
    let meassage = {
      message: error?.message,
      success: error?.success,
    };
    await dispatch(errorMessage(meassage));
  }
};

export const allBlogs = () => async (dispatch) => {
  try {
    const { data } = await api.allBlogs();
    dispatch({
      type: ALL_BLOGS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = (id, navigate) => async (dispatch) => {
  try {
    if (document.cookie) {
      const { data } = await api.deleteBlog(id);
      dispatch({
        type: DELETE_BLOG,
        payload: data,
      });
      let meassage = {
        message: data?.message,
        success: data?.success,
      };
      await dispatch(successMessage(meassage));
      dispatch(allBlogs());
    } else {
      navigate("/login");
    }
  } catch (error) {
    let meassage = {
      message: error?.message,
      success: error?.success,
    };
    await dispatch(errorMessage(meassage));
    console.log(error);
  }
};

export const getBlog = (id, navigate, page) => async (dispatch) => {
  try {
    const { data } = await api.getBlog(id);
    dispatch({
      type: GET_BLOG,
      payload: data,
    });
    if (data && navigate && page === "blogPage") {
      navigate(`/blog/${id}`);
    }
    if (data && navigate && page === "editPage") {
      navigate(`/editBlog/${id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog = (id, blogData, navigate) => async (dispatch) => {
  try {
    if (document.cookie) {
      await dispatch(loader(true));
      const { data } = await api.updateBlog(id, blogData);
      dispatch({
        type: UPDATE_BLOG,
        payload: data,
      });
      await dispatch(loader(false));
      let meassage = {
        message: data?.message,
        success: data?.success,
      };
      await dispatch(successMessage(meassage));
      if (data) {
        navigate(`/dashboard`);
      }
    } else {
      navigate("/login");
    }
  } catch (error) {
    await dispatch(loader(false));
    let meassage = {
      message: error?.message,
      success: error?.success,
    };
    await dispatch(errorMessage(meassage));
    console.log(error);
  }
};
