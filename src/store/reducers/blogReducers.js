import {
  CREATE_BLOG,
  ALL_BLOGS,
  DELETE_BLOG,
  GET_BLOG,
  UPDATE_BLOG,
  LOADER,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE
} from "../constatnt";

const blog = (
  state = {
    blog: null,
    allBlogs: null,
    deleteBlog: null,
    updateData: null,
    loader: false,
    errorMessage: false,
    successMessage: false,
  },
  action
) => {
  switch (action.type) {
    case CREATE_BLOG:
      return { ...state, blog: action.payload };
    case ALL_BLOGS:
      return { ...state, allBlogs: action.payload.result };
    case GET_BLOG:
      return { ...state, blog: action.payload.data };
    case DELETE_BLOG:
      return { ...state, deleteBlog: action.payload };
    case UPDATE_BLOG:
      return { ...state, updateData: action.payload };
      case LOADER:
        return { ...state, loader: action.payload };
      case SUCCESS_MESSAGE:
        return { ...state, successMessage: action.payload };
      case ERROR_MESSAGE:
        return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
export default blog;
