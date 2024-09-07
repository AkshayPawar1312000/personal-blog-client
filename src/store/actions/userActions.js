import * as api from "../apis/index";
import { ADD_USER, USER_LOGIN } from "../constatnt";
import { successMessage, errorMessage, loader } from "./blogActions";

export const addUser = (userData, navigate) => async (dispatch) => {
  try {
    await dispatch(loader(true));
    const { data } = await api.addUser(userData);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data.data[0]));
    }
    dispatch({
      type: ADD_USER,
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
  } catch (error) {
    await dispatch(loader(false));
    console.log(error);
    let meassage = {
      message: error?.response.data.message,
      success: true,
    };
    await dispatch(errorMessage(meassage));
  }
};

export const userLogin = (userData, navigate) => async (dispatch) => {
  try {
    await dispatch(loader(true));
    const { data } = await api.userLogin(userData);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data?.data));
    }
    dispatch({
      type: USER_LOGIN,
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
  } catch (error) {
    await dispatch(loader(false));
    console.log(error);
    let meassage = {
      message: error?.response.data.message,
      success: true,
    };
    await dispatch(errorMessage(meassage));
  }
};
